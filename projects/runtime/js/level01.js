var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { type: "sawblade", "x": 450, "y": groundY - 15 },
                { type: "sawblade", "x": 850, "y": groundY - 115 },
                { type: "sawblade", "x": 1250, "y":groundY -  15},
                { type: "enemy", "x": 500, "y": groundY - 50        },
                {  type: "enemy", "x": 700, "y": groundY - 50        },
                {  type: "enemy", "x": 1300, "y": groundY - 50       },
                {   type: "reward", "x": 1500, "y": groundY - 25    },
            ]
        };

        
        for (i = 0;i < levelData.gameItems.length ;i++ ){
            var object = levelData.gameItems[i];
            if (object.type === "sawblade"){
                createSawBlade(object.x ,object.y)
            }

            if (object.type === "enemy"){
                createEnemy(object.x, object.y)
            }

            if (object.type === "reward"){
                createReward(object.x, object.y)
            }
        }
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);


            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25
            obstacleImage.y = -25
        }

        
        

        function createEnemy(x, y) {

            var enemy = game.createGameItem('enemy', 25);
            var redSquare = draw.rect(50, 50, "#9a0000");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy);

            enemy.velocityX = -1;

            enemy.rotationalVelocity = 10;


            enemy.onPlayerCollision = function () {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };

            enemy.onProjectileCollision = function () {
                console.log("Halle has hit the enemy");
                game.increaseScore(100);
                enemy.fadeOut();
            }

        }
        
    
    
        function createReward(x, y) {

            var reward = game.createGameItem('reward', 25);
            var redSquare = draw.rect(50, 50, "#32B4A9");
            redSquare.x = -25;
            redSquare.y = -25;
            reward.addChild(redSquare);

            reward.x = x;
            reward.y = y;

            game.addGameItem(reward);

            reward.velocityX = -1;

            reward.rotationalVelocity = 10;


            reward.onPlayerCollision = function () {
                console.log('Halle has collected the reward');
                game.changeIntegrity(+10);
                reward.fadeOut();
                game.increaseScore(400);
            };

            reward.onProjectileCollision = function () {
                console.log("Halle has hit the reward");
                game.increaseScore();
            }
            
        }
        
                // DO NOT EDIT CODE BELOW HERE
    };




    // DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
    if ((typeof process !== 'undefined') &&
        (typeof process.versions.node !== 'undefined')) {
        // here, export any references you need for tests //
        module.exports = level01;
    }
}
