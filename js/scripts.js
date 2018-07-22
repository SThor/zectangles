var canvas = {
  canvas:null,
  ctx:null,
  color_bg:"white",
  color_main:"black",
  padding:50,
  settings:{
    cellsInWidth : 4,
    itInCell : 100,
    offsetInIt : 0.05
  },
  resizeCanvas : function() {
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight - grid.canvas.offsetTop;
    
    var minSide = Math.min(window.innerWidth,window.innerHeight);
    
    canvas.canvas.width = (4/5)*minSide;
    canvas.canvas.height = (4/5)*minSide;
    
    /**
     * Your drawings need to be inside this function otherwise they will be reset when
     * you resize the browser window and the canvas goes will be cleared.
     */
    canvas.drawStuff();
  },
  
  drawStuff: function() {
    canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvas.ctx.clearRect(0,0,canvas.canvas.width,canvas.canvas.height);
    canvas.ctx.fillStyle = canvas.color_bg;
    canvas.ctx.fillRect(0,0,canvas.canvas.width,canvas.canvas.height);
    canvas.ctx.strokeStyle = canvas.color_main;
    canvas.ctx.translate(0.5+canvas.padding,0.5+canvas.padding);
    //canvas.ctx.strokeRect(0,0,canvas.canvas.width-1-2*canvas.padding,canvas.canvas.height-1-2*canvas.padding);
    
    var cellLenght = (canvas.canvas.width-2*canvas.padding-1)/canvas.settings.cellsInWidth;
    var i,j;
    for(i=0;i<canvas.settings.cellsInWidth;i++){
      for(j=0;j<canvas.settings.cellsInWidth;j++){
        canvas.ctx.setTransform(1,0,0,1,(i*cellLenght)+cellLenght/2+0.5+canvas.padding,(j*cellLenght)+cellLenght/2+0.5+canvas.padding);
        canvas.drawCell(i,j,cellLenght);
      }
    }
  },
  
  drawCell: function(i,j,cellLenght){
    //canvas.ctx.strokeRect(0-cellLenght/2+canvas.padding,0-cellLenght/2+canvas.padding,cellLenght,cellLenght);
    var k;
    var angle = Math.atan(canvas.settings.offsetInIt/(1-canvas.settings.offsetInIt));
    var scale = canvas.settings.offsetInIt/Math.sin(angle);
    if((i+j)%2===0){
      angle = -angle;
    }
    for(k=0;k<canvas.settings.itInCell;k++){
      canvas.ctx.strokeRect(0-cellLenght/2,0-cellLenght/2,cellLenght,cellLenght);
      canvas.ctx.rotate(angle);
      canvas.ctx.scale(scale,scale);
    }
  }
};

canvas.canvas = document.getElementById('canvas');
canvas.ctx = canvas.canvas.getContext('2d');
window.addEventListener('resize', canvas.resizeCanvas, false);
canvas.resizeCanvas();