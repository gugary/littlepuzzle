$(
function(){
    var w=50,DIV={},origin={x:0,y:0},u={
	a:[0,0],b:[w,0],c:[2*w,0],d:[3*w,0],
	e:[0,w],f:[w,w],g:[2*w,w],h:[3*w,w],
	i:[0,2*w],j:[w,2*w],k:[2*w,2*w],l:[3*w,2*w],
	m:[0,3*w],n:[w,3*w],o:[2*w,3*w],p:[3*w,3*w],
	q:[0,4*w],r:[w,4*w],s:[2*w,4*w],t:[3*w,4*w]
    },aj={
	a:['b','e'],b:['a','c','f'],c:['b','d','g'],d:['c','h'],
	e:['a','f','i'],f:['b','e','g','j'],g:['c','f','h','k'],h:['d','g','l'],
	i:['e','j','m'],j:['f','i','k','n'],k:['g','j','l','o'],l:['h','k','p'],
	m:['i','n','q'],n:['j','m','o','r'],o:['k','n','p','s'],p:['l','o','t'],
	q:['m','r'],r:['n','q','s'],s:['o','r','t'],t:['p','s']
    },D={
	A:[w,2*w],B:[2*w,2*w],C:[w,2*w],
	D:[w,2*w],E:[2*w,w],F:[w,2*w],
	G:[w,w],H:[w,w],I:[w,w],J:[w,w]
    },start,S=initS(),U=initU(),j0=0,count=0;
    var ok={x:w+'px',y:3*w+'px'},done=false;
    function initS(){
	return aToS(['r','s']);
    }
    function initU(){
	var r={},s={
	    A:['a','e'],B:['b','f','c','g'],C:['d','h'],
	    D:['i','m'],E:['j','k'],F:['l','p'],
	    G:['n'],H:['o'],I:['q'],J:['t']
	};
	for(var k in s)r[k]=aToS(s[k]);
	return r;
    }
    function aToS(a){
	var s={};
	for(var k in a)s[a[k]]=true;
	return s;
    }
    function onStart(e,ui){
	start=ui.position;
    };
    function onStop(e,ui){
	var stop=ui.position,delta=w/2,hm=false,vm=false;
	var x0=start.left,x1=x0,y0=start.top,y1=y0;
	function hori(dx,div){
	    if(dx>delta+w){
		x1=w*Math.floor((x1+2*w)/w);
	    }
	    else if(dx>delta){
		x1=w*Math.floor((x1+w)/w);
	    }
	    else if(-dx>delta+w){
		x1=w*Math.ceil((x1-2*w)/w);
	    }
	    else if(-dx>delta){
		x1=w*Math.ceil((x1-w)/w);
	    }
	    if(x1!==x0){
		$(div).css({left:x1+'px'});
	    }
	    return x1!==x0;
	}
	function vert(dy,div){
	    if(dy>delta+w){
		y1=w*Math.floor((y1+2*w)/w); 
	    }
	    else if(dy>delta){
		y1=w*Math.floor((y1+w)/w); 
	    }
	    else if(-dy>delta+w){
		y1=w*Math.ceil((y1-2*w)/w); 
	    }
	    else if(-dy>delta){
		y1=w*Math.ceil((y1-w)/w); 
	    }
	    if(y1!==y0){
		$(div).css({top:y1+'px'});
	    }
	    return y1!==y0;
	}
	if(stop.top==start.top){
	    var dx=stop.left-start.left;
	    hm=hori(dx,this);
	}
	else if(stop.left==start.left){
	    var dy=stop.top-start.top;
	    vm=vert(dy,this);
	}
	else{
	    var dx=stop.left-start.left,dy=stop.top-start.top,ax=Math.abs(dx),ay=Math.abs(dy);
	    if(ax>ay){
		hm=hori(dx,this); 
		if(hm) $(this).css({top:start.top+'px'});
	    }
	    else if(ay>ax){
		vm=vert(dy,this);
		if(vm) $(this).css({left:start.left+'px'});
	    }
	}
	if(false===hm&&false===vm){
	    $(this).css({left:x0+'px',top:y0+'px'});
	    return;
	}
	else if('B'==this.id){
	    swap4(U.B,hm,vm);
	}
	else if(this.id in {A:true,C:true,D:true,E:true,F:true}){
	    var P=U[this.id];
	    if(adj(S)&&tnt(P,S)&&occupy(this,S))
		swap22(P,S);
	    else
		swap21(P,whichs(this),hm,vm);
	}
	else{
	    swap11(U[this.id],whichs(this));
	}
	if(!done)count+=1;
	$('#B').html('<p></p><center><font size=2 color="white">'+count+'</font></center>');
	cycle();
	if(count>=200)$('#Z').show();
	check();
    };
    function check(){
	var bx=$('#B').css('left'),by=$('#B').css('top');
	if(ok.x==bx&&ok.y==by){
	    done=true;
	    $('#Z').html('<center><font size=2>Congratulations !!! You won!!!</font></center>').show();
	}
    }
    function nilall(){
	for(var k in U){
	    var c=Box(U[k]),nil=[c[0],c[1],c[0],c[1]];
	    $(DIV[k]).draggable({containment:cplus(nil)});
	}
    }
    function sbox(s){
	var x=u[s],l=x[0],t=x[1];
	return[l,t,l+w,t+w];
    }
    function box(p){
	var d=D[p.id],w=d[0],h=d[1],l=px2n($(p).css('left')),t=px2n($(p).css('top'));
	return[l,t,l+w,t+h];
    }
    function contains(a,b){
	return a[0]<=b[0]&&a[1]<=b[1]&&a[2]>=b[2]&&a[3]>=b[3];
    }
    function occupy(P){
	var p=box(P),s=Box(S);
	return p[0]==s[0]&&p[1]==s[1]&&p[2]==s[2];
    }
    function whichs(v){
	var nb=box(v);
	for(var k in S){
	    if(contains(nb,sbox(k)))break;
	}
	return k;
    }
    function Box(P){
	var x1=4*w,y1=5*w,x2=0,y2=0;
	for(var k in P){
	    var b=u[k];
	    if(b[0]<x1)x1=b[0];
	    if(b[1]<y1)y1=b[1];
	    if(b[0]+w>x2)x2=b[0]+w;
	    if(b[1]+w>y2)y2=b[1]+w;
	}
	return[x1,y1,x2,y2];
    }
    function swap11(M,q){
	for(var k in M) delete M[k];
	M[q]=true;
	delete S[q];
	S[k]=true;
    }
    function swap22(x,y){
	var t={};
	for(var k in x){
	    t[k]=true;
	    delete x[k];
	}
	for(k in y){
	    x[k]=true;
	    delete y[k];
	}
	for(k in t) y[k]=true;
    }
    function swap21(T,s,hm,vm){
	var a=u[s],a0=a[0],a1=a[1];
	var y=keys(T),b=u[y[0]],b0=b[0],b1=b[1];
	if(vm){
	    var t={};
	    if(b1<a1){
		t[y[0]]=true;delete T[y[0]];
	    }
	    else{
		t[y[1]]=true;delete T[y[1]];
	    }
	    T[s]=true;
	    delete S[s];
	    for(k in t) S[k]=true;
	}
	else if(hm){
	    var t={};
	    if(b0<a0){
		t[y[0]]=true;delete T[y[0]];
	    }
	    else{
		t[y[1]]=true;delete T[y[1]];
	    }
	    T[s]=true;
	    delete S[s];
	    for(k in t) S[k]=true;
	}
    }
    function swap4(B,hm,vm){
	var x=keys(S),a=u[x[0]],a0=a[0],a1=a[1];
	var y=keys(B),b=u[y[0]],b0=b[0],b1=b[1];
	var t={};
	if(vm){
	    if(b1<a1){
		t[y[0]]=true;delete B[y[0]];
		t[y[1]]=true;delete B[y[1]];
	    }
	    else{
		t[y[2]]=true;delete B[y[2]];
		t[y[3]]=true;delete B[y[3]];
	    }
	}
	else if(hm){
	    if(b0<a0){
		t[y[0]]=true;delete B[y[0]];
		t[y[2]]=true;delete B[y[2]];
	    }
	    else{
		t[y[1]]=true;delete B[y[1]];
		t[y[3]]=true;delete B[y[3]];
	    }
	}
	for(var k in S){
	    B[k]=true;
	    delete S[k];
	}
	for(k in t) S[k]=true;
    }
    function mkdiv(id,className){
	var x=document.createElement('div');
	x.id=id;
	x.className=className;
	var c=Box(U[id]),d=D[id],nil=[c[0],c[1],c[0],c[1]];
	$(x).css({position:'absolute',left:c[0]+'px',top:c[1]+'px',width:d[0]+'px',height:d[1]+'px'})
	    .draggable({start:onStart,stop:onStop,scroll:false,containment:cplus(nil)});
	DIV[id]=x;
	return x;
    }
    function calc4(bx){
	var x1=bx[0],y1=bx[1],x2=bx[2],y2=bx[3];
	if(y2-y1>x2-x1)
	    return[x1,y1,x1,y1+w];
	else
	    return[x1,y1,x1+w,y1];
    }
    function calc2(bx,name){
	var x1=bx[0],y1=bx[1],x2=bx[2],y2=bx[3];
	if('E'==name){
	    if(x2-x1==y2-y1){
		return[x1,y1,x1,y1+w];
	    }
	    else if(x2-x1==3*w){
		return[x1,y1,x1+w,y1];
	    }
	    else
		return[x1,y1,x1+2*w,y1];
	}
	if(x2-x1==y2-y1)
	    return[x1,y1,x1+w,y1];
	else
	    return[x1,y1,x1,y1+2*w];
    }
    function calc(bx,k){
	var x1=bx[0],y1=bx[1],x2=bx[2],y2=bx[3],w1=(k-1)*w;
	x2-=w;
	y2-=w;
	if(x1==x2){
	    return[x1,y1,x1,y2-w1];
	}
	else if(y1==y2){
	    return[x1,y1,x2-w1,y1];
	}
	return[];
    }
    function cplus(c){
	var dx=origin.x,dy=origin.y;
	return[c[0]+dx,c[1]+dy,c[2]+dx,c[3]+dy];
    }
    function setc(p,c){
	var nc=cplus(c);
	$(DIV[p]).draggable({containment:nc});
    }
    function size(s){
	return keys(s).length;
    }
    function keys(s){
	var ks=[];
	for(var k in s) ks.push(k);
	return ks.sort();
    }
    function fw(p,q){
	return w==Math.abs(p-q);
    }
    function f2w(p,q){
	return 2*w==Math.abs(p-q);
    }
    function merge(s,t){
	var r={};
	for(var j in s)r[j]=s[j];
	for(var k in t)r[k]=t[k];
	return r;
    }
    function findU(u){
	var r=u;
	for(var k in U){
	    if(u in U[k]){
		r=k;
		break;
	    }
	}
	return r;
    }    
    function neighbors(s){
	var t={},r={};
	for(var k in s){
	    var n=aj[k];
	    for(var j in n)t[n[j]]=true;
	}
	for(k in s)delete t[k];
	for(k in t){
	    r[findU(k)]=true;
	}
	return r;
    }
    function one(P,S){
	var x=keys(P),a=u[x[0]],b=u[x[1]],y=keys(S),s=u[y[0]];
	return a[0]==b[0]&&s[0]==a[0]&&(fw(s[1],a[1])||fw(s[1],b[1]))||a[1]==b[1]&&s[1]==a[1]&&(fw(s[0],a[0])||fw(s[0],b[0]));
    }
    function tnt(P,S){
	var x=keys(S),a=u[x[0]],x1=a[0],y1=a[1],b=u[x[1]],x2=b[0],y2=b[1];
	var y=keys(P),c=u[y[0]],x3=c[0],y3=c[1],d=u[y[1]],x4=d[0],y4=d[1];
	if(x2-x1!=x4-x3)return false;
	if(y1==y3&&(fw(x1,x3)||f2w(x1,x3)))return true;
	if(x1==x3&&(fw(y1,y3)||f2w(y1,y3)))return true;
	return false;
    }
    function tnf(P,S){
	var x=keys(P),a=u[x[0]],r=false;
	var y=keys(S),s=u[y[0]],t=u[y[1]];
	if(s[0]==t[0]){
	    var b=u[x[1]];
	    r=s[1]==a[1]&&(fw(s[0],a[0])||fw(s[0],b[0]));
	}
	else if(s[1]==t[1]){
	    var c=u[x[2]];
	    r=s[0]==a[0]&&(fw(s[1],a[1])||fw(s[1],c[1]));
	}
	return r;
    }
    function tno(P,S){
	var x=keys(P),a=u[x[0]],r=false;
	var y=keys(S),s=u[y[0]],t=u[y[1]];
	if(s[0]==t[0]){
	    r=s[0]==a[0]&&(fw(s[1],a[1])||fw(t[1],a[1]));
	}
	else if(s[1]==t[1]){
	    r=s[1]==a[1]&&(fw(s[0],a[0])||fw(t[0],a[0]));
	}
	return r;
    }
    function bucket(n){
	var r={o:{},t:{},f:{}};
	for(var k in n){
	    var s=size(U[k]);
	    switch(s){
	    case 1:r.o[k]=true;break;
	    case 2:r.t[k]=true;break;
	    case 4:r.f[k]=true;break;
	    }
	}
	return r;
    }
    function cycle(){
	nilall();
	var b=bucket(neighbors(S));
	if(adj(S)){
	    for(var k in b.f){
		var P=U[k];
		if(tnf(P,S)){
		    var m=merge(P,S);
		    setc(k,calc4(Box(m)));
		}
	    }
	    for(k in b.t){
		var P=U[k];
		if(tnt(P,S)){
		    var m=merge(P,S);
		    setc(k,calc2(Box(m),k));
		}
		else{
		    for(var s in S){
			var T={};T[s]=true;
			if(one(P,T)){
			    var m=merge(P,T);
			    setc(k,calc(Box(m),size(P)));
			}
		    }
		}
	    }
	    var t={};
	    for(k in b.o){
		var P=U[k];
		if(tno(P,S)){
		    t[k]=true;
		    var m=merge(P,S);
		    setc(k,calc(Box(m),1));
		}
	    }
	    for(k in t) delete b.o[k];
	}
	else {
	    var t={};
	    for(var j in b.t){
		var c=sandwich2(S,U[j]);
		if(c[0]){
		    t[j]=true;
		    setc(j,c[1]);
		}
	    }
	    for(j in t) delete b.t[j];
	
	    for(j in b.t){
		var P=U[j];
		for(var s in S){
		    var T={};T[s]=true;
		    if(one(P,T)){
			var m=merge(P,T);
			setc(j,calc(Box(m),size(P)));
		    }
		}
	    }
	}
	
	var t={};
	for(j in b.o){
	    var c=special(S,U[j]);
	    if(c[0]){
		t[j]=true;
		setc(j,c[1]);
	    }
	    c=sandwich(S,U[j]);
	    if(c[0]){
		t[j]=true;
		setc(j,c[1]);
	    }
	}
	for(j in t) delete b.o[j];
	
	for(var k in b.o){
	    for(var s in S){
		var T={};T[s]=true;
		var M=merge(U[k],T);
		if(adj(M))setc(k,calc(Box(M),1));
	    }
	}
    }
    function px2n(s){
	return parseInt(s.substring(0,s.indexOf('px',s)));
    }
    function op(p){
	if(''!=p.left)origin.x+=px2n(p.left);
	if(''!=p.top)origin.y+=px2n(p.top);
    }
    function adj(X){
	var x=keys(X),a=u[x[0]],x1=a[0],y1=a[1],b=u[x[1]],x2=b[0],y2=b[1];
	return x1==x2&&fw(y1,y2)||y1==y2&&fw(x1,x2);
    }
    function sandwich(S,P){
	var x=keys(S),a=u[x[0]],x1=a[0],y1=a[1],b=u[x[1]],x2=b[0],y2=b[1];
	var y=keys(P),c=u[y[0]],x3=c[0],y3=c[1];
	if(y1==y3&&y3==y2&&fw(x1,x3)&&fw(x3,x2)){
	    return[true,[x1,y1,x1+2*w,y1]];
	}
	else if(x1==x3&&x3==x2&&fw(y1,y3)&&fw(y3,y2)){
	    return[true,[x1,y1,x1,y1+2*w]];
	}
	return[false,[]];
    }
    function sandwich2(S,P){
	var x=keys(S),a=u[x[0]],x1=a[0],y1=a[1],b=u[x[1]],x2=b[0],y2=b[1];
	var y=keys(P),c=u[y[0]],x3=c[0],y3=c[1];
	if(y1==y3&&y3==y2&&fw(x1,x3)&&f2w(x3,x2)){
	    return[true,[x1,y1,x1+2*w,y1]];
	}
	else if(x1==x3&&x3==x2&&fw(y1,y3)&&f2w(y3,y2)){
	    return[true,[x1,y1,x1,y1+2*w]];
	}
	return[false,[]];
    }
    function special(S,P){
	var x=keys(S),a=u[x[0]],x1=a[0],y1=a[1],b=u[x[1]],x2=b[0],y2=b[1];
	var y=keys(P),c=u[y[0]],x3=c[0],y3=c[1];
	var nesw=x2+w==x1&&y1+w==y2&&(x3==x1&&y3==y2||x3==x2&&y3==y1);
	if(nesw){
	    var x0=x2,y0=y1;
	    return[true,[x0,y0,x0+w,y0+w]];
	}
	var senw=x1+w==x2&&y1+w==y2&&(x3==x1&&y3==y2||x3==x2&&y3==y1);
	if(senw){
	    var x0=x1,y0=y1;
	    return[true,[x0,y0,x0+w,y0+w]];
	}
	return[false,[]];
    }
    function setorig(board){
	var p=$('body').offset();
	origin.x+=p.left;
	origin.y+=p.top;
	op({left:board.css('border-left-width'),top:board.css('border-top-width')});
	op({left:board.css('left'),top:board.css('top')});
    }
    function log(x){
	console.log(x);
    }
    function myway(){
	return[['J',-w,0],['I',w,0],['D',0,w],['F',0,w],['E',-w,0],['H',0,-w],['H',w,0],['J',0,-2*w],['F',-w,0],['H',0,2*w],['J',w,0],['J',0,w],['E',2*w,0],['G',0,-w],['G',-w,0],['I',0,-2*w],['F',-w,0],['J',-w,0],['J',0,w],['E',0,w],['I',2*w,0],['G',2*w,0],['F',0,-w],['D',0,-w],['J',-2*w,0],['H',-2*w,0],['E',0,w],['I',0,w],['G',w,0],['F',w,0],['H',0,-2*w],['J',w,0],['J',0,-w],['E',-2*w,0],['I',0,w], ['I',-w,0],['G',0,2*w],['F',w,0],['H',w,0],['J',w,0],['D',w,0],['A',0,2*w],['B',-w,0],['H',0,-2*w],['J',0,-2*w],['I',0,-2*w],['G',-w,0],['G',0,-w],['E',2*w,0],['D',0,w],['A',0,w],['B',0,w],['H',-2*w,0],['J',0,-w],['J',-w,0],['I',0,-2*w],['B',w,0],['A',0,-2*w],['D',-w,0],['G',-w,0],['G',0,w],['B',0,w],['I',0,w],['I',-w,0],['C',-w,0],['F',0,-2*w],['B',w,0],['I',0,2*w],['J',0,w],['H',w,0],['A',0,-w],['D',0,-w],['G',-w,0],['I',0,w],['B',-w,0],['F',0,2*w],['C',w,0],['H',w,0],['J',w,0],['A',w,0],['D',0,-2*w],['B',-w,0],['J',0,2*w],['H',0,2*w],['C',-w,0],['F',0,-2*w],['J',w,0],['J',0,-w],['E',0,-w],['I',2*w,0],['G',2*w,0],['B',0,w],['H',-2*w,0],['J',-2*w,0],['E',0,-w],['G',0,-w],['G',w,0],['B',w,0]];
    }
    function move(){
	var j=j0,s=myway(),e=s[j],id=e[0],dx=e[1];dy=e[2],div=DIV[id];
	if(dx==0){
	    var t=px2n($(div).css('top'));t+=dy;
	    $(div).css({top:t+'px'});
	}
	else{
	    var l=px2n($(div).css('left'));l+=dx;
	    $(div).css({left:l+'px'});
	}
	j0+=1;
	if(j0<s.length){
	    setTimeout(function(){move();},200);
	}
	else if(j0==s.length){
	    log('the end');
	    $('#Z').hide();
	    //setTimeout(function(){ initp();enable();},2000);
	}
    }
    function mkdbg(id,className){
	var x=document.createElement('div');
	x.id=id;
	x.className=className;
	$(x).css({left:0+'px',top:260+'px',width:200+'px',height:25+'px'})
	    .click(function(){
		 initp();setTimeout(function(){$(x).hide();move();},2000);});
	$(x).html('<center><font size=2>Give up? Press me!</font></center>').hide();
	return x;
    }
    function initp(){
	S=initS(),U=initU();
	var all=keys(U);
	for(var k in all){
	    var id=all[k],div=DIV[id],c=Box(U[id]);
	    $(div)
		.css({left:c[0]+'px',top:c[1]+'px'})
		.draggable({disabled:true});
	}
    }
    function enable(){
	j0=0,count=0;$('#B').html("");
	var all=keys(U);
	for(var k in all){
	    var id=all[k],div=DIV[id];
	    $(div).draggable({disabled:false});
	}
    }
    function init(parent){
	setorig(parent);
	var all=keys(U);
	for(var k in all){
	    var id=all[k];
	    parent.append(mkdiv(id,'gug-piece gug-'+id));
	}
	parent.append(mkdbg('Z','gug-piece gug-debug'));
	cycle();
    }
    init($('#Board'));
});
