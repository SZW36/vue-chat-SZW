<template>
    <div class="container" style="margin-bottom: 30px">
        <form>
            <div class="form-group">
                <input type="text" name="message" class="form-control" placeholder="Enter message ..." v-model="newMessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>
            <br>
            <button v-on:click.prevent = "createMessage" class="btn btn-primary" type="submit" name="action">Submit</button>
        </form>
    </div>
</template>

<script>
import {collection, addDoc} from "firebase/firestore";
import db from "@/firebase/init.js";
export default {
    name: 'CreateMessage',
    props: ['name'],
    data() {
        return {
            newMessage: null,
            errorText: null
        }
    },
    methods: {
        createMessage () {
            if (this.newMessage) {
                const coll = collection(db, "messages");
                addDoc(coll,{
                    message: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                })
                // setDoc(doc(coll,this.name),{ // only use setDoc when you have a meaningful doc name
                //     message: this.newMessage,
                //     name: this.name,
                //     timestamp: Date.now()
                // })
                this.newMessage = null;
                this.errorText = null;
            } else {
                this.errorText = "A message must be entered first!";
            }
        }
    },   
}
</script>