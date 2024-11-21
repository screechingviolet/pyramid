/*
moving platforms
lives
wince when you hit the wall
lose the keys when you die
lilac

*/

// PHASER STUFF WHICH IS NECESSARY
let config = {
	type: Phaser.AUTO,
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y : 350 },
            debug: false
        }
    },
    scene: {
    	preload: preload,
        create: create,
        update: update
    }
};
const game = new Phaser.Game(config);



// PRELOAD ASSETS (including those sweet sweet platforms)
function preload(){
      this.load.image('background', 'assets/pyramid.png');
      this.load.image('platform','assets/platform.png');
      this.load.image('wall','assets/wall.png');
      this.load.image('spike','assets/spike.png');
      this.load.image('keys','assets/keys.png');
      this.load.image('endscreen','assets/endscreen.png');

this.load.spritesheet('player', 
        'assets/spritesheet.png',
        { frameWidth: 32, frameHeight: 48 }
    );

    this.load.spritesheet('duckintern', 
        'assets/duckintern.png',
        { frameWidth: 32, frameHeight: 48 }
    );

     this.load.spritesheet('duckdeemon', 
        'assets/duckdeemon.png',
        { frameWidth: 32, frameHeight: 48 }
    );

      this.load.spritesheet('duckfactory', 
        'assets/duckfactory.png',
        { frameWidth: 32, frameHeight: 48 }
    );

     this.load.spritesheet('duckmaster', 
        'assets/duckmaster.png',
        { frameWidth: 32, frameHeight: 48 }
    );

  
this.load.spritesheet('door', 
        'assets/door.png',
        { frameWidth: 30, frameHeight: 100 }
    );

/*
  this.load.spritesheet('orangeButton','assets/orangeButton.png',
  {frameWidth: 30, frameHeight:20}
  );
*/
  this.load.spritesheet('orangeButton','assets/orangeButton.png',
  {frameWidth: 20, frameHeight:30}
  );
}
  let orangeButtonState = false;
let keysNum = 0;
let win = false;
// A LOT OF STUFF GETS CREATED
function create(){

// SET UP CAMERA
   let bg = this.add.image(0, 0, "background").setOrigin(0, 0.7);
  this.cameras.main.setBounds(0, -1400, 600, 2000);

// SET UP IMMOVABLE PLATFORMS

// 32 offset
 platforms = this.physics.add.staticGroup();
    platforms.create(200, 600, 'platform').setScale(5).refreshBody();
    for (i = 400; i > -1000; i-=0) {
      for (e of [[100,300],[132,500],[300,500]]) {
         platforms.create(e[0], i, 'platform');
    platforms.create(e[1], i, 'platform');
    i-=150;
    // console.log(i);
    // console.log(e);
         }
    // platforms.create(750, 220, 'platform');
    /*platforms.create(100, 250, 'platform');
    platforms.create(300, 250, 'platform');

    platforms.create(100, 100, 'platform');
    platforms.create(300, 100, 'platform');
*/   }

// SLIDING PLATFORM
    slider = this.physics.add.image(332,250,'platform');
    slider.setImmovable();
    slider.body.allowGravity = false;

// TWIRLING PLATFORM
    rotator = this.physics.add.image(231,-1084,'platform').setOrigin(1,1);
    rotator.setImmovable();
    rotator.body.allowGravity = false;
    rotator.angle = 0;

// BASEMENT WALLS
  walls = this.physics.add.staticGroup();
  walls.create(-50,100,'wall').setScale(5.5).refreshBody();
    blockedside = walls.create(-1,-450,'wall').setScale(2.25).refreshBody();
    walls.create(-60,-1050,'wall').setScale(4).refreshBody();
    

    // walls.create(650,100,'wall').setScale(5.5).refreshBody(); 32.5
        walls.create(610,-215,'wall').setScale(3).refreshBody();
        walls.create(595,450,'wall').setScale(2).refreshBody();
  walls.create(615,200,'wall');

    walls.create(640,-950,'wall').setScale(5).refreshBody();
falsewall2 = this.add.image(-27,-1045,'wall').setScale(4);

// SPIKES OF DEATH
  spikes = this.physics.add.group({
 key: 'spike',
 repeat: 7,
 setXY: { x:50, y:500, stepX: 50 }
}
);

spikes1 = this.physics.add.group({
 key: 'spike',
 repeat: 3,
 setXY: { x:425, y:-800, stepX: 50 }
}
);
/* stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

}); */

this.physics.add.collider(spikes, platforms);
this.physics.add.collider(spikes1, platforms);

// DOOR
door = this.physics.add.sprite(570,-1315,'door');
door.body.allowGravity = false;
door.setImmovable();

// KEYS
keys = this.physics.add.staticGroup();
trickone = keys.create(50,-1000,'keys');
keys.create(480,-265,'keys');
weirdone = keys.create(582,200,'keys');
falsewall = this.add.image(595,200,'wall').setScale(2);

function Spiked(player,spike) {
  this.cameras.main.shake(100);
  player.setPosition(500, 500);
  
}

function KeyFound(player,keys) {
  keys.disableBody(true, true);
  keysNum+=1;
  door.setFrame(keysNum);
  if (!trickone.visible) {
    while (rotator.angle > -90) {
      rotator.angle -= 0.01;
    }
    rotator.setSize(30,200);
    rotator.setOffset(170,30);
    this.physics.add.collider(player,rotator);
  }
}



/* 
// ORANGE BUTTON ORIGINAL
function ButtonPress(player,button) {
  button.setFrame(1);
  button.setImmovable();
  button.body.allowGravity = false;
  player.setVelocityY(0);
  orangeButtonState = true;
  // player.setY(player.y-1);
}
button = this.physics.add.sprite(100,350,'orangeButton');
button.setBounce(0);
this.physics.add.collider(button, platforms);
*/

// ORANGE BUTTON
function ButtonPress(player,button) {
  button.setFrame(1);
  player.setVelocityY(0);
  orangeButtonState = true;
  player.setY(360);
}
button = this.physics.add.sprite(42,350,'orangeButton');
button.setImmovable();
button.body.allowGravity = false;
this.physics.add.collider(button, platforms);

// PLAYER SETUP
// 500,-650
 player = this.physics.add.sprite(500, 500, 'player');
 duckintern = this.physics.add.sprite(50,-100,'duckintern');
  duckdeemon = this.physics.add.sprite(50,-550,'duckdeemon');
    duckfactory = this.physics.add.sprite(50,-1000,'duckfactory');
        duckmaster = this.physics.add.sprite(250,-1300,'duckmaster');


function CheckForWin(player,door) {
  console.log(keysNum);
  
  if (keysNum === 3) {
    win = true;
    end = this.add.image(300,300,'endscreen');
    end.setScrollFactor(0);
    keysNum+=1;
  }
}
// player.setTint(OxFF00FF);

// PLAYER COLLIDERS 
this.physics.add.overlap(player, spikes, Spiked, null, this);
this.physics.add.overlap(player, spikes1, Spiked, null, this);
this.physics.add.overlap(player, button, ButtonPress, null, this);
player.setBounce(0.2);
this.physics.add.collider(button, player);
this.physics.add.collider(player, slider);
this.physics.add.overlap(player,duckintern,Spiked,null,this);
this.physics.add.collider(duckintern,platforms);
this.physics.add.overlap(player,duckdeemon,Spiked,null,this);
this.physics.add.collider(duckdeemon,platforms);
this.physics.add.overlap(player,duckfactory,Spiked,null,this);
this.physics.add.collider(duckfactory,platforms);
this.physics.add.overlap(player,duckmaster,Spiked,null,this);
this.physics.add.collider(duckmaster,platforms);
this.physics.add.overlap(player,keys,KeyFound,null,this);
this.physics.add.overlap(player,door,CheckForWin,null,this);

// player.setCollideWorldBounds(true);


// ANIMATIONS

for (character of [['player',''],['duckintern','1'],['duckdeemon','2'],['duckfactory','3'],['duckmaster','4']]) {
this.anims.create({
    key: 'left'+character[1],
    frames: this.anims.generateFrameNumbers(character[0], { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});
 
this.anims.create({
    key: 'turn'+character[1],
    frames: [ { key: character[0], frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right'+character[1],
    frames: this.anims.generateFrameNumbers(character[0], { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
}

// MORE PLAYER STUFF 
this.cameras.main.startFollow(player);

this.physics.add.collider(player, platforms);
this.physics.add.collider(player, walls);

// KEYBOARD INPUT
cursors = this.input.keyboard.createCursorKeys();

}

// UPDATE STUFF
function update(){
  
// PLAYER MOVEMENT
if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true); }
else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true); }
else {
    player.setVelocityX(0);
    player.anims.play('turn');  }
if (cursors.up.isDown && player.body.onFloor()) {
    player.setVelocityY(-330);   }

// ALL THAT STUPID BUTTON AND SLIDER
 button.body.debugBodyColor = button.body.touching.none ? 0x0099ff : 0xff9900;

if (button.body.touching.none) {
  button.setFrame(0);
  slider.setVelocityX(-20);
  if (slider.x <= 332) {
    slider.setVelocityX(0);
  }
} else if (orangeButtonState) {
  slider.setVelocityX(20);
  
  if (slider.x >= 532) {
    slider.setVelocityX(0);
  }
}

// THE DUCKS
if (duckintern.x <= 60) {
  duckintern.anims.play('turn1');
  duckintern.setVelocityX(50);
  duckinternAlign = "right1";
} else if (duckintern.x >= 325) {
  duckintern.anims.play('turn1');
  duckintern.setVelocityX(-50);
  duckinternAlign = "left1";

} else {
  duckintern.anims.play(duckinternAlign,true);
}

if (duckdeemon.x <= 60) {
  duckdeemon.anims.play('turn2');
  duckdeemon.setVelocityX(70);
  duckdeemonAlign = "right2";
} else if (duckdeemon.x >= 325) {
  duckdeemon.anims.play('turn2');
  duckdeemon.setVelocityX(-70);
  duckdeemonAlign = "left2";

} else {
  duckdeemon.anims.play(duckdeemonAlign,true);
}


if (duckfactory.x <= 60) {
  duckfactory.anims.play('turn3');
  duckfactory.setVelocityX(90);
  duckfactoryAlign = "right3";
} else if (duckfactory.x >= 325) {
  duckfactory.anims.play('turn3');
  duckfactory.setVelocityX(-90);
  duckfactoryAlign = "left3";

} else {
  duckfactory.anims.play(duckfactoryAlign,true);
}

if (duckmaster.x <= 260) {
  duckmaster.anims.play('turn4');
  duckmaster.setVelocityX(110);
  duckmasterAlign = "right4";
} else if (duckmaster.x >= 525) {
  duckmaster.anims.play('turn4');
  duckmaster.setVelocityX(-110);
  duckmasterAlign = "left4";

} else {
  duckmaster.anims.play(duckmasterAlign,true);
}
/*
if (keysNum === 3) {
  console.log("All keys found");
  keysNum+=1;
}
*/

}