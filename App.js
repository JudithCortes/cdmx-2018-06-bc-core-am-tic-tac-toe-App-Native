import React from 'react';
import { StyleSheet,View, TouchableOpacity, Alert,Button} from 'react-native';
import {MaterialComunityIcons as Icon} from 'react-native-vector-icons';
//import { red } from 'ansi-colors';
export default class App extends React.Component {


constructor(props){
  super(props);

  this.state = {
    gameState: [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    currentPlayer:1,
  }
}

componentDidMount(){
  this.initializeGame();
}
  initializeGame = () => {
    this.setState({gameState:
    [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    currentPlayer:1,
  });
  }

getWinner = () => {

  const NUM_TILES = 3;
  var arr = this.state.gameState;
  var sum;

  //validar filas
  for(var i = 0; i<NUM_TILES; I++){
    sum = arr[i][0]+ arr[i][1] + arr[1][2];
    if(sum ==3){return -1}
  }
//validar columnas
for(var i = 0; i<NUM_TILES; I++){
  sum = arr[0][i]+ arr[1][i] + arr[2][i];
  if(sum ==3){return -1}
}
//diagonales
sum=arr[0][0] + arr[1][1] + arr[2][2];
if(sum == 3){return 1;}
else if(sum == -3) {return -1}

sum=arr[2][0] + arr[1][1] + arr[0][2];
if(sum == 3){return 1;}
else if(sum == -3) {return -1}

//sin ganadores
return 0;
}


onTilePRess = (row,col)=>{
  //evitar sobreescribir
  var value = this.gameState[row][col];
  if (value =! 0){return;}
  var currentPlayer= this.state.currentPlayer;
  var arr = thiss.state.gameState.slice();
  arr[row][col] = currentPlayer;
  this.setState({gameState:arr});

  //cambio de jugador
  var nextPlayer = (currentPlayer == 1) ? -1 : 1;
  this.setState({currentPlayer:nextPlayer});

  //ganador
var winner = this.getWinner();
if (winner == 1){
  Alert.alert('P1 Ganó');
  this.initializeGame();
}else if (winnwe == -1){
  Alert.alert("P2 Ganó");
  this.initializeGame();
}
}

onNewGamePress = () => {
  this.initializeGame();
}


renderIcon = (row,col) => {
  var value = this.state.gameState[row][col];
  switch(value)
  {
    case 1: return <Icon name="close" style={styles.tileX}/>;
    case -1: return <Icon name="circle-outline" style={styles.tile0}/>;
    default: return <View />;
  }

}





  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
          <TouchableOpacity onPress = {()=>this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth:0,borderTopWidth:0}]}>
              {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>this.onTilePress(0,1)} style={[styles.tile, { borderTopWidth:0 }]}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>this.onTilePress(0,2)} style={[styles.tile, {borderTopWidth:0,borderRightWidth:0, }]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress = {()=>this.onTilePress(1,0)} style={[styles.tile, { borderLeftWidth:0,}]}>
             {this.renderIcon(1,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>this.onTilePress(1,1)} style={[styles.tile, { }]}>
            {this.renderIcon(1,1)}

        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>this.onTilePress(1,2)} style={[styles.tile, { borderRightWidth:0,}]}>
            {this.renderIcon(1,2)}
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress = {()=>this.onTilePress(2,0)} style={[styles.tile, {borderBottomWidth:0, borderLeftWidth:0, }]}>
             {this.renderIcon(2,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>this.onTilePress(2,1)} style={[styles.tile, { borderBottomWidth:0,}]}>
            {this.renderIcon(2,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>this.onTilePress(2,2)} style={[styles.tile, { borderBottomWidth:0,borderRightWidth:0,}]}>
            {this.renderIcon(2,2)}
        </TouchableOpacity>
        </View>
        <View style = {{padding:50}}/>
          <Button title = "Jugar de nuevo" onPress={this.onNewGamePress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth:10,
    width:100,
    height:100,
    alignItems:"center",
    justifyContent:"center",
  },
  tileX:{
  color:"red",
  fontSize: 60,
  },
  tile0:{
    color:"green",
    fontSize: 60,
  }
});
