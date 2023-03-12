<template>
  <v-app>
    <v-row align="center" class="bg-blue-grey-lighten-5">
      <v-col>
        <v-row class="mb-3" justify="center">
          <v-col cols="12" md="2">
            <v-card height="450">
              <v-card-title class="text-center" v-text="'User List'" />
              <v-card height="400" flat tile>
                <v-card-subtitle class="text-center">
                  {{ this.self ? `Logined as "${this.self.username}"` : "" }}
                </v-card-subtitle>
                <v-divider />
                <v-card-text>
                  <v-list-item
                    v-for="i in userList"
                    class="font-weight-bold"
                    link
                    v-text="i.username"
                    @click="target = i"
                  />
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card height="450">
              <v-card-title
                class="text-center"
                v-text="target.username || 'First Select A User'"
              />
              <v-divider />
              <v-card id="scroll" class="overflow-auto" height="400" flat tile>
                <v-card-item v-for="i in msgList">
                  <span class="font-weight-bold" v-text="i.username + ': '" />
                  {{ i.msg }}
                </v-card-item>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="msg"
              :label="target.uid ? 'Type Your Message' : 'Select A Person'"
              class="mr-2"
              append-icon="mdi-send"
              bg-color="white"
              v-on:keypress.enter="sendMsg"
              @click:append="sendMsg"
              :disabled="target.uid ? false : true"
            />
          </v-col>
        </v-row>
        <v-card-subtitle class="text-center" v-text="notification" />
      </v-col>
    </v-row>

    <!-- # Dialog START -->

    <v-dialog v-model="dialog" width="330" persistent>
      <v-card>
        <div class="mx-2">
          <v-card-title class="text-center mb-n2" v-text="'Enter Username'" />
          <v-divider class="mx-4 my-2"></v-divider>
          <v-row class="mx-2">
            <v-col>
              <v-text-field
                v-model="username"
                label="Username"
                prepend-icon="mdi-account"
              />
            </v-col>
          </v-row>
          <v-row class="mb-2" justify="center" v-show="errorStr">
            <span class="text-red"> {{ errorStr }}</span>
          </v-row>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" @click="loginChat"> CONTINUE </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- # Dialog END -->
  </v-app>
</template>

<script>
import axios from "axios";
import socket from "./mixins";

export default {
  data: () => {
    return {
      socket: null,
      dialog: true,
      notification: "",
      username: "baki",
      msg: "",
      userList: [],
      msgList: [],
      self: null,
      target: {},
      errorStr: "",
    };
  },
  methods: {
    async loginChat() {
      if (this.username) {
        try {
          let res = await axios({
            method: "post",
            url: "/login",
            data: { username: this.username },
          });
          if (res.data.token) {
            this.self = res.data;
            this.connectSocket(res.data);
            this.dialog = false;
          } else {
            throw JSON.stringify(res.data);
          }
        } catch (error) {
          console.log(error);
          this.errorStr = error;
        }
      } else this.errorStr = "Enter a username";
    },
    scrollToEnd() {
      const element = document.getElementById("scroll");
      element.scrollTop = element.scrollHeight;
    },
  },
  watch: {
    async notification(val) {
      await val;
      if (val !== "") {
        await new Promise((r) => setTimeout(r, 3000));
        this.notification = "";
      }
    },
    async msgList(val) {
      await val;
      this.scrollToEnd();
    },
  },
  mixins: [socket],
};
</script>
