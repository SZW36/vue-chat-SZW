<template>
    <div class="container chat" style = "width : 700px;">
        <h2 class="text-primary text-center">Real-Time Chat</h2>
        <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
        <div class = "card name">
            <div class = "card-body">
                <label for=""> <b>Name:</b> {{name}}</label>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <p class="text-secondary nomessages" v-if="messages.length == 0">
                    [No messages yet!]
                </p>
                <div class="messages" id = "output">
                    <div v-for="message in messages" :key="message.id" :class = "float-start">
                        <span class="text-secondary time d-flex justify-content-center">{{message.timestamp}}</span>
                        <div v-if = "isSelf(message)">
                            <div class = "d-flex justify-content-end">
                                <span class = "flex-shrink-1 bg-success rounded py-2 px-3 mr-3 text-white"> {{message.message}} </span>
                                <span class="text-info">&nbsp;&nbsp;[{{ message.name }}] </span>
                            </div>
                        </div>
                        <div v-else class = "d-flex justify-content-start">
                            <span class="text-info">[{{ message.name }}] &nbsp;&nbsp; </span>
                            <span class = "flex-shrink-1 bg-secondary rounded py-2 px-3 mr-3 text-white"> {{message.message}} </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-action">
                <CreateMessage :name="name"/> <!-- This will pass name variable to child (which is CreateMessage.vue) -->
            </div>
        </div>
    </div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage.vue';
import {collection, orderBy, onSnapshot, query} from "firebase/firestore";
import db from '@/firebase/init.js';
import moment from 'moment';
export default {
    name: 'Chat',
    components: {
        CreateMessage,
    },
    data() {
        return {
            messages: [],
            name: this.$route.params.name, // This gets the variable value from router
        }
    },
    created() {
        const q = query(collection(db, "messages"), orderBy('timestamp'));
        onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
                if (change.type == 'added') {
                    let doc = change.doc;
                    this.messages.push({
                        id: doc.id,
                        name: doc.data().name,
                        message: doc.data().message,
                        timestamp: moment(doc.data().timestamp).format('LTS')
                    });
                }
            });
        });
    },
    methods:{
        isSelf(message){
            return message.name == this.$route.params.name;
        }
    },
    updated(){ // This will execute after DOM is re-rendered and patched (updated).
        document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
    }
}
</script>

<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 0px;
}
.chat h5{
    margin-top: 0px;
    margin-bottom: 40px;
}
.chat span{
    font-size: 1.2em;
}
.chat .time{
    display: block;
    font-size: 0.7em;
    margin-top: 15px;
    margin-bottom: 0px;
}
.messages{
    max-height: 500px;
    overflow: auto;
}
.name{
    font-size: 1.2em;
    text-align: left;
}

</style>