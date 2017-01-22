//Lucía Carrión García
// modelar nave, enemigo y disparo, dando una implementación realista del método disparo


function Points (x, y) {
	this.x = x;
	this.y = y;
};

//////////////////////////////////////////////////////
/////////Constructora de todas las naves//////////////
//////////////////////////////////////////////////////

function Ship (position) {
	this._position = position;
	this._state = "Alive";
};

Ship.prototype.moveLeft = function () { this._position.x -= 2; };
Ship.prototype.moveRight = function () { this._position.x += 2; };

/////////////////////////////////////////////
////////Constructora de enemigos/////////////
/////////////////////////////////////////////

function Enemy (lifes, position) {
	Ship.apply(this, [position]);

	this._life = lifes;
};

Enemy.prototype.advance = function () { this._position.y += 2; };
Enemy.prototype.shoot = function (target) {
	if (this._life > 0) {
		var player = target;
		player._life -= 1;
		player.check();
		console.log ("Your ship has been hit!");
	}
	else ("This ship can't shoot, it has already been destroyed");

};
Enemy.prototype.check = function () {
	if (this._life <= 0) {
		this._state = "Dead";
		console.log ("You have destroyed the enemy ship!");
	}
};

/////////////////////////////////////////
/////////Constructora del player/////////
/////////////////////////////////////////

function Player (position) {
	Ship.apply(this, [position]);

	this._life = 3;
};

Player.prototype.shoot = function (target) {
	if (this._life > 0){
		var enemy = target;
		enemy._life -= 1;
		enemy.check();
		console.log ("You've hit the enemy ship!");
	}
	else console.log("This ship can't shoot, it has already been destroyed");

};

Player.prototype.check = function () {
	if (this._life <= 0) {
		this._state = "Dead";
		console.log ("Your ship has been destroyed! You're dead, and with you, the Rebelion. Long live the Empire.");
	}
};

///////////////////////////////////////
///////////creamos las cosas///////////
///////////////////////////////////////

var DeathStar = new Enemy (2, new Points (10, 10));
var RebelShip = new Player (new Points (10, 50));

console.log("Before the battle:");
console.log (DeathStar);
console.log (RebelShip);

console.log ("They chase each other:");
DeathStar.advance();
DeathStar.moveLeft();
RebelShip.moveRight();

console.log (DeathStar);
console.log (RebelShip);

console.log ("The terrible shooting starts:");
DeathStar.shoot(RebelShip);
RebelShip.shoot(DeathStar);

DeathStar.shoot(RebelShip);
RebelShip.shoot(DeathStar);

DeathStar.shoot(RebelShip);
RebelShip.shoot(DeathStar);

console.log (DeathStar);
console.log (RebelShip);