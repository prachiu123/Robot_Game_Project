var gridw = 500;
var pad = 10;
var gridh = 500;

var img1 = document.createElement('img');
var img3 = document.createElement('img');
var img4 = document.createElement('img');

img1.src='robot.jpeg';
img3.src='wall.jpeg';
img4.src='coin.jpeg';

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);

var wall_list = new Array();
var coin_list = new Array();
var robot_list =  new Array();
var pickup_list = new Array();

var wall_b,coin_A,a,b;
var count = 0,dropcount = 0;

function iswall(x1,y1,wall_list)
{
  for(var i = 0 ; i < wall_list.length ; i++)
  {
    a = wall_list[i][0];
    b = wall_list[i][1];
    if((x1 == a) && (y1 == b))
    {
      alert(" there is wall can't go ahead");
      alert("robot is stop");
      console.log("block");
      context.drawImage(img3,0,0,300,250,x,y,50,50);
      return true;
    }
    else
    {
      return false;
    }
   }
 }
function iscoin(x,y,coin_list)
{
  for(var i = 0 ; i < coin_list.length ; i++)
  {
    a = coin_list[i][0];
    b = coin_list[i][1];
    if((x == a) && (y == b))
    {
      pickup_list.push([x,y]);
      count = count +1;
      console.log(count);
      alert("coin pick up");
      alert(count);
      return true;
    }
    else
    {
      count = count;
      //alert("not coin for pick");
    }
  }
}
function dropcoin(x,y,pickup_list)
{
  for(var i = 0 ; i < pickup_list.length; i++)
  {
    dropcount = dropcount + 1;
    context.drawImage(img4,0,0,100,100,x,y,40,40);
  }
}
function movement(x1,y1,x,y)
{
  
  if((y < 0 || x < 0) || (y > gridh || x > gridw)) 
       {
        //alert(x);
        context.clearRect(x,y,40,40);
        context.clearRect(x1,y1,40,40);
      }
  else
    {

        context.clearRect(x1,y1,40,40)
        robot(x,y);
        coin_A = iscoin(x,y,coin_list);
        wall_b = iswall(x,y,wall_list);

      if(coin_A == true)
      {
         context.drawImage(img4,0,0,100,100,x,y,40,40);
         if(count > dropcount)
        {
          alert("drop");
          dropcoin(x1,y1,pickup_list);
        }
      }
      else if(wall_b = true)
      {
        x = x;
        y = y;
        robot(x,y);
      }
    }
  
}

function robot(x,y)
{
  robot_list.push([x,y]);
  context.drawImage(img1,0,0,250,250,x,y,40,40);
}

function wall(x,y)
{
  wall_list.push([x,y]);
  context.drawImage(img3,0,0,300,250,x,y,50,50);
}

function coin(x,y)
{ 
  coin_list.push([x,y]);
  context.drawImage(img4,0,0,100,100,x,y,40,40);
}

function robot_action(st,x,y)
{
  var moves = [];
  moves.push([x, y]);
  alert("robot is run the first position of robot");
  for(i = 0; i < st.length ;i++)
  {

   //alert(st[i]);
   
   if(x < 0 || y < 0)
   {
     //alert("robot out of grid");
        context.clearRect(x,y,40,40);
        context.clearRect(x-50,y-50,40,40);
   }
     
    else if((st[i] == 'move_left') && (y > 0) && (x > 0))
    {
     
     x+=50;
      
    }
    else if((st[i]=='move_right') && (y > 0 )&& (x > 0))
    {
      x-=50;
    }
    else if((st[i]=='move_up')&& (y > 0 )&& (x > 0))
    {
      y-=50;
    }
    else if((st[i]=='move_down')&& (y > 0 ))
    {
      y+=50;
    }
    else if ((st[i] == 'iswall') && (y > 0) && ( x > 0))
    {
      iswall(x,y,wall_list);
    }
    else if ((st[i] == 'iscoin') && (y > 0) && (x > 0))
    {
      iscoin(x,y,coin_list);
    }
   else if ((st[i] == 'dropcoin') && (y > 0) && (x > 0))
   {
     dropcoin(x,y,pickup_list);
   }
   
    moves.push([x, y]);
    
  }
  
  cntr = 1;
  var myvar = setInterval(function()
      {
        if(cntr >= moves.length)
        {
          clearInterval(myvar);
          return;
        }
        var x1 = moves[cntr-1][0]
        var y1 = moves[cntr-1][1]
        var x = moves[cntr][0]
        var y = moves[cntr][1];
        console.log(x1, y1, x, y)
        movement(x1,y1,x,y);
        cntr += 1;
       
      },
        prompt('enter the robot speed'));
    
     //alert("robot is move 300ms  speed");


}


function drawBoard()
{
  img1.onload = robot(15,15);
  img3.onload = wall(415,115);
  img4.onload = coin(465,465);
  for (var x = 0; x <= gridw; x+= 50) 
  {
    context.moveTo(0.5 + x + pad, pad);
    context.lineTo(0.5 + x + pad, gridh + pad);
  }
  for (var x = 0; x <= gridh; x+= 50) 
  {
    context.moveTo(pad, 0.5 + x + pad);
    context.lineTo(gridw + pad, 0.5 + x + pad);
  }
  context.strokeStyle = "black";
  context.stroke();
}

function read_file_content()
{
  var file = document.getElementById("get_file").files[0];
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");

  reader.onload = function (evt)
  {
    var temp = evt.target.result
      var allLines = temp.split('\n');
        robot_action(allLines,15,15);
        //robot_action(allLines,265,15);
        //robot_action(allLines,215,115);

  }
}

drawBoard();
//robot(265,15);
//robot(215,115);
coin(15,365);
coin(165,15);
coin(15,465);
coin(15,165);
coin(115,215);
coin(165,165);
coin(115,315);
coin(215,315);
coin(265,215);
coin(265,65);
coin(415,65);
coin(315,415);
coin(365,215);
wall(365,365);
wall(465,265);
wall(215,265);
