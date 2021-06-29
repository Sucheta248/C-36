class Food {
    constructor(){
      this.index = null;
      this.distance = 0;
      this.name = null;
    }
  
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance
      });
    }
  
    // to get the information of all the players
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }

    dislay(){
        var x=80, y=100

        imageMode(CENTER);
image(this.image,720,220,70,70);

if (this.foodStock!=0){
    for(var i=0; i < this.foodStock; i++){
        if(i%10==0){
            x=80;
            y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;

    }

    }

  }
}
  