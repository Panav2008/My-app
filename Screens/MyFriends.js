import React, { Component } from "react";
import {
TouchableOpacity,View,Text, FlatList,TextInput,Image,StyleSheet,ImageBackground} from "react-native";
import{ListItem}from 'react-native-elements'
  import db from "../config"
  import firebase from "firebase"
import { render } from "react-dom";
  export default class Myfriends extends React.Component{
constructor(props){
    super(props)
    this.state={
    friendlist:[]
    }
    
}
componentDidMount(){
    this.GetFriendList()
}
GetFriendList=async()=>{
    console.log("getFriendList")
    const ref= await db.collection("friendlist").get()
    ref.docs.map((doc)=>{
        this.setState({
            friendlist:[...this.state.friendlist,doc.data()]
        })
    })
    console.log("this.FriendList"+this.state.FriendList)
}
renderItem=({item,i})=>{
return(
    <ListItem 
        key={i}    bottomDivider>
        <ListItem.Content>
          
            <ListItem.Title style= {{color: 'black',fontWeight:"bold"}}> {item.FriendName}</ListItem.Title>
            <ListItem.Subtitle style={{color : 'green'}}>{item.email}</ListItem.Subtitle>
            <TouchableOpacity style={styles.button}>
            <Text>
                ViewDetails
            </Text>
            </TouchableOpacity>
            </ListItem.Content>
            </ListItem>
        
)}
render(){
    return(
        <View>
            <Text>
                Myfriends
            </Text>
            <FlatList
            data={this.state.friendlist}
            renderItem={this.renderItem}
            keyExtractor={(item,index)=>{index.toString()}}/>
        </View>
    )
  }
  }
  const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8
        }}
  })
    
  
      
  