import React, { Component } from "react";
import {
    TouchableOpacity,View,Text, FlatList,TextInput,Image,StyleSheet,ImageBackground
  } from "react-native";
  import db from "../config"
  import firebase from "firebase"
  export default class Home extends React.Component{
    constructor(props){ 
        super(props) 
        this.state={ ContactList:[],
             Search:"" ,
             IsFlatlistVisible:false,
             comment:"",
             userid:firebase.auth().currentUser.email,
             AllFriendActivity:[] } }
      GetContact=async()=>{
          console.log("getContact")
          const ref= await db.collection("users").get()
          ref.docs.map((doc)=>{
              this.setState({
                  ContactList:[...this.state.ContactList,doc.data()]
              })
          })
          console.log("this.ContactList"+this.state.ContactList)
      }
      /*componentDidMount=async()=>{
          
        const ref= await db.collection("users").get()
        if (ref.docs.length) {
            console.log("docempty")
        }
        else{

        
        ref.docs.map((doc)=>{
            this.setState({
                ContactList:[...this.state.ContactList,doc.data()]
            })
        })
        console.log("this.ContactList"+this.state.ContactList)
      }}*/
      SearchPerson=async(text)=>{
        var ref= await db.collection("users").where("first_name","==",text).get()
        ref.docs.map((doc)=>{
            this.setState({
                ContactList:[...this.state.ContactList,doc.data()],
                IsFlatlistVisible:true,
                Search:""
            })
        })
      }
      addFriend=async(item)=>{
db.collection("friendlist").add({
    FriendName:item.first_name + item.last_name,
    contact:item.contact,
    email:item.email_id,
    address:item.address,
    currentUser:this.state.userid

})
    this.setState({
        IsFlatlistVisible:false
    })

      }
      send=async(item)=>{
          db.collection("Friendactivity").add({
            chat:item,
            currentUser:this.state.userid
          })
          

      }
      componentDidMount(){
          this.GetFriendActivity()
      }
      GetFriendActivity=async()=>{
          var ref = await db.collection("Friendactivity").get()
          ref.docs.map((doc)=>{
                this.setState({
                    AllFriendActivity:[...this.state.AllFriendActivity,doc.data()]
          })
          })
      }
render(){
    return(
        
        <View style={{backgroundColor:"cyan",flex:1,alignItems:"center"}} >
            
           <TextInput
           style={styles.TextInputbox}
           placeholder="Person'name"
           onChangeText={(text)=>{this.setState({
            Search:text
           })}}
           value={this.state.Search}/>
             <View style={{position:"absolute",marginRight:-250}}>
             <TouchableOpacity
           onPress={this.SearchPerson(this.state.Search)}>
               <Image
               style={{width:35,height:35,position:"absolute",marginRight:-30}}
               source={require("../assets/Search.png")}/>
           </TouchableOpacity>
                 </View>  
           
           
           { this.state.IsFlatlistVisible?
           (<FlatList
        data={this.state.ContactList}
        renderItem={({item})=>
        ( <View style={{borderBottomWidth:2}}> 
        <Text>{" Full Name "+item.first_name + " " + item.last_name}
        </Text> <Text> {" City " +item.City} </Text> 
        <TouchableOpacity style={{width:70,height:20,backgroundColor:"red"}}
        onPress={()=>{this.addFriend(item)}}>
            <Text>
                addFriend
            </Text>
        </TouchableOpacity>
        </View> )} 
        keyExtractor={(item,index)=>{index.toString()}} />)
        :undefined
        }
        <View >
        <TextInput 
        style={[styles.TextInputbox,{marginTop:20,marginBottom:20,height:200}]}
        placeholder={"chat"} multiline={true} onChangeText={(chat)=>{this.setState({
            comment:chat
        })}}/>
        
        </View>
        <View style={{marginRight:-200}}>
        <TouchableOpacity style={{width:40,height:30,}} onPress={()=>{this.send(this.state.comment)}}>
                <Text>
                    Send
                </Text>
            </TouchableOpacity>
        </View>
        <View>
            <FlatList
            data={this.state.AllFriendActivity}
            renderItem={({item})=>(
                <View style={{borderBottomWidth:2}}>
                    <Text style={{fontWeight:"bold",fontSize:20}}>{"user:"+ item.currentUser}</Text>
                    <Text style={{fontWeight:"bold",fontSize:20}}>{"chat:"+item.chat}</Text>
                </View>
                
            )}
            keyExtractor={(item,index)=>{index.toString()}}/>
                
            
        </View>
            
        
        </View>
        
        

        
    )
}

  }
 const styles= StyleSheet.create({
     TextInputbox:{
         width:250,
         height:40,
         borderWidth:1.5,
         borderColor:"red"
     }
 })