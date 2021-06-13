import React from 'react';
import { FlatList, StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase'
import db from '../config'

export default class SearchScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            allTransactions:[],
            lastVisibleTransaction:null
        }
    }
    fetchMoreTransaction=async()=>{
        const query=await db.collection("transaction").startAfter(this.state.lastVisibleTransaction).limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[this.state.allTransactions,doc.data()],
                lastVisibleTransaction:doc
            })
        })
    }
    componentDidMount=async()=>{
        const query=await db.collection("transaction").get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[this.state.allTransactions,doc.data()]
            })
        })
    }
    render(){
        return(
            
          <FlatList
          data={this.state.allTransactions}
          renderItem={({item})=>(
              <View>
                  <Text>{"bookId:"+item.bookId}</Text>
                  <Text>{"studentId:"+item.studentId}</Text>
                  <Text>{"transactionType:"+item.transactionType}</Text>
                  <Text>{"date:"+item.date.toDate()}</Text>
              </View>
          )}
          keyExtractor={(item,index)=>index.toString()} 
          onEndReached={this.fetchMoreTransaction}
          onEndReachedThreshold={0.7}/>
         

        )
    }
}