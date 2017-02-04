function Smi(src){
  this.src=src;
  var reader=new FileReader();
  var th    =this;
  reader.onload=function(){
    var syncCase=['<SYNC','<Sync'];
    for(var i=0; i<syncCase.length; i++){
      var blocks     =reader.result.split(syncCase[i]);
      if(blocks.length==1){
        continue
      }
      break;
    }
    th.content  =[];
    for(var i=0; i<blocks.length; i++){
      var block=blocks[i];
      var time =Number((block.split("Start=")[1]||"").split(">")[0]);
      var arr  =(block.split("<P")[1]||"").split(">");
      var text =(arr.join('>')).substring(arr[0].length+1);
      if(isNaN(time) || !text){
        continue;
      }
      th.content.push([time,text]);
    }
  }
  reader.readAsText(this.src,"ISO-8859-1");
};
Smi.prototype.getIndex=function(t){
  var s=0,e=this.content.length,m;
  while(s<e){
    m=parseInt((s+e)/2);
    if(this.content[m][0]<t){
      s=m+1;
    }else if(this.content[m][0]>t){
      e=m-1;
    }
  }
  return m;
}
