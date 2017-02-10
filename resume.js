var W;
var H;
$(document).ready(function(){
window.onload = function(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	W = window.innerWidth;
    H = window.innerHeight;
	canvas.width = W-17;
	canvas.height =H;
	
	//snowflake particles
	var mp = 25; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	
	//animation loop
	setInterval(draw, 33);

}

})

window.onresize = function(){
	//canvas init
	
	//canvas dimensions
	 W = window.innerWidth;
	 H = window.innerHeight;
	canvas.width = W-17;
	canvas.height = H;
	
	
}

window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 0.1);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
//var hand=document.getElementById("container");
//window.addEventListener("scroll",parallax,false);
//hand.addEventListener("scroll",parallax,false);
//hand.on("scroll",parallax);


/*
$(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = element_position;

    if(y_scroll_pos > scroll_pos_test) {
   alert("Heeloo");
	var div1=document.getElementById("down1");
	var div2=document.getElementById("down2");
	var div3=document.getElementById("down3");
		var div4=document.getElementById("down4");
	div1.style.top=-(window.pageYOffset/0.2)+'px';
div2.style.top=-(window.pageYOffset/8)+'px';
	div3.style.top=-(window.pageYOffset/0.2)+'px';


           //do stuff
    }
});
*/

var nav = $('#container');
//var nav=document.getElementById("down1");
var element_position = nav.offset();

var screen_height = $(window).height();
var activation_offset = 0.5;//determines how far up the the page the element needs to be before triggering the function
var activation_point = element_position - (screen_height * activation_offset);
var max_scroll_height = $('body').height() - screen_height - 5;//-5 for a little bit of buffer

//Does something when user scrolls to it OR
//Does it when user has reached the bottom of the page and hasn't triggered the function yet
   $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;

    var element_in_view = y_scroll_pos > activation_point;
    var has_reached_bottom_of_page = max_scroll_height <= y_scroll_pos && !element_in_view;

    if(element_in_view || has_reached_bottom_of_page) {
        //Do something

var up1=document.getElementById("up1");
var up2=document.getElementById("up2");
var up3=document.getElementById("up3");

var down1=document.getElementById("down1");
var down2=document.getElementById("down2");
var down3=document.getElementById("down3");

var insidecover=document.getElementById("insidecover");

up1.style.top=-(window.pageYOffset/5)+'px';
down1.style.top=-(window.pageYOffset/5)+'px';

up2.style.top=-(window.pageYOffset/5)+'px';
down2.style.top=-(window.pageYOffset/5)+'px';


up3.style.top=-(window.pageYOffset/5)+'px';
down3.style.top=-(window.pageYOffset/5)+'px';

insidecover.style.top=-(window.pageYOffset/5)+'px';


            }
           });


 
/*
function parallax(){
	var div1=document.getElementById("down1");
	var div2=document.getElementById("down2");
	var div3=document.getElementById("down3");
		var div4=document.getElementById("down4");
	div1.style.top=-(window.pageYOffset/0.2)+'px';
div2.style.top=-(window.pageYOffset/8)+'px';
	div3.style.top=-(window.pageYOffset/0.2)+'px';


}
*/