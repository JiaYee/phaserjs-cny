import Phaser from "phaser";

const gameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload: preloadScene,
    create: createScene,
    update: updateScene,
  },
};

const game = new Phaser.Game(gameConfig);
packetCount = 0;
maxPacketCount = 20;

function preloadScene() {
  this.load.image("packet", "/src/packet.png");
  this.load.audio("bounce", "/src/bounce.mp3");
  this.load.audio("bgm", "/src/bgm.mp3");
}

function createScene() {
  this.bgm = this.sound.add("bgm", { loop: true });
  this.bgm.play();

  // create score text object with default value of 0
  this.score = 0;
  this.scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#ffffff",
  });

  // enable physics for packets
  this.packets = this.physics.add.group({
    defaultKey: "packet",
    bounceY: 0.2,
    bounceX: 1,
    collideWorldBounds: true,
  });

  // set bounds for world
  this.physics.world.setBounds(0, 0, gameConfig.width, gameConfig.height);

  // spawn a sprite at random intervals
  this.time.addEvent({
    delay: 1000, // in milliseconds
    callback: spawnPacket,
    callbackScope: this,
    loop: true,
  });

  this.physics.add.collider(this.packets, this.packets);

  // handle user tapping on the packets
  this.input.on(
    "pointerdown",
    (pointer) => {
      this.packets.children.each((packet) => {
        if (packet.getBounds().contains(pointer.x, pointer.y)) {
          this.sound.play("bounce");
          packet.setVelocityY(Phaser.Math.Between(-200, -500));
          this.score += 1;
          this.scoreText.setText("Score: " + this.score);
          packet.destroy();
        }
      }, this);
    },
    this
  );
}

function spawnPacket() {
  if (this.packets.getChildren().length >= 10) return;

  // spawn sprite from left or right of the screen at random height
  const fromLeft = Phaser.Math.Between(0, 1) === 0;
  const x = fromLeft ? 0 : gameConfig.width;
  const y = Phaser.Math.Between(0, gameConfig.height);

  // add the packet to the group and set its velocity
  const packet = this.packets.create(x, y, "packet");
  packet.setDisplaySize(packet.width * 0.3, packet.height * 0.3);
  packet.setVelocityX(fromLeft ? 200 : -200);

  // set bounce against top, left, right, bottom boundary
  packet.setBounce(1);
}

function updateScene() {
  // update score text object with current score value
  this.scoreText.setText(`Score: ${this.score}`);
}
