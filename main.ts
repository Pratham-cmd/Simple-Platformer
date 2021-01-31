scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    startNextLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -200
})
function startNextLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    currentLevel += 1
    if (currentLevel == 1) {
        scene.setBackgroundColor(11)
        tiles.setTilemap(tilemap`level`)
    } else if (currentLevel == 2) {
        scene.setBackgroundColor(9)
        tiles.setTilemap(tilemap`level2`)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let value2 of tiles.getTilesByType(assets.tile`tile5`)) {
        myEnemy = sprites.create(img`
            a a a a a a a a a a a a a a a a 
            a b b b b b b b b b b b b b b a 
            a b a a a a a a a a a a a a b a 
            a b a a b b a a a a b b a a b a 
            a b a a a a b a a b a a a a b a 
            a b a a a a a a a a a a a a b a 
            a b a a a b a a a a b a a a b a 
            a b a a a b a a a a b a a a b a 
            a b a a a a a a a a a a a a b a 
            a b a a a a a a a a a a a a b a 
            a b a a a b b b b b b a a a b a 
            a b a a b a a a a a a b a a b a 
            a b a a a a a a a a a a a a b a 
            a b a a a a a a a a a a a a b a 
            a b b b b b b b b b b b b b b a 
            a a a a a a a a a a a a a a a a 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value2)
        myEnemy.follow(mySprite, 30)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
    } else {
        info.changeLifeBy(-1)
    }
})
let myEnemy: Sprite = null
let currentLevel = 0
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.Player)
mySprite.ay = 500
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
info.setLife(3)
startNextLevel()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Player)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (mySprite.vx < 0 == value.tileKindAt(TileDirection.Left, assets.tile`tile1`)) {
                value.vy = -150
            } else if (mySprite.vx < 0 == value.tileKindAt(TileDirection.Left, assets.tile`tile1`)) {
                value.vy = -150
            }
        } else if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -30
        }
    }
})
