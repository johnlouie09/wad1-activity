<template>
  <v-container>
    <h1 class="mb-4">Posts</h1>
    <v-textarea
      auto-grow
      v-model="inputText"
      rows="3"
      row-height="15"
      label="What's on your mind?"
      variant="outlined"
    ></v-textarea>

    <!-- Post Button -->
    <div class="d-flex justify-end">
      <v-btn @click="handleSubmit" elevation="2" class="bg bg-primary" variant="outlined">
        Post
      </v-btn>
    </div>

    <v-divider class="mt-5"></v-divider>

    <!-- Submitted Post -->
    <v-card v-for="(submission, index) in submissions" :key="index" class="mt-5">
      <v-row align="center" class="mt-1">
        <v-col cols="auto">
          <v-icon color="primary">mdi-account</v-icon>
        </v-col>
        <v-spacer> {{ submission.title }} </v-spacer>
        <v-col>
          <v-card-subtitle class="text-h6 text-right">
            {{ submission.dateTime }}
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-card-title>{{ submission.text }}</v-card-title>

      <!-- Display Replies as Cards at the Top -->
      <v-row class="ma-4">
        <v-col>
          <v-card v-for="(reply, replyIndex) in submission.replies" :key="replyIndex" class="mb-2">
            <v-row align="center" class="mt-1">
              <v-col cols="auto">
                <v-icon color="primary">mdi-account</v-icon>
              </v-col>
              <v-spacer>{{ reply.name }}</v-spacer>
              <v-col>
                <v-card-subtitle class="text-h6 text-right">
                  {{ reply.dateTime }}
                </v-card-subtitle>
              </v-col>
            </v-row>
            <v-card-title>{{ reply.text }}</v-card-title>

            <!-- Heart Button for Replies -->
            <v-row class="ma-4">
              <v-col class="text-right">
                <v-btn @click="incrementReplyHeart(index, replyIndex)" color="red">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <span class="ml-2">{{ reply.heartCounter }}</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Heart and Reply Buttons for Main Post -->
      <v-row class="ma-4">
        <v-col class="text-right">
          <v-btn @click="incrementCounter(index)" color="red">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <span class="ml-2">{{ submission.heartCounter }}</span>

          <!-- Reply Button -->
          <v-btn class="ml-2" @click="toggleReplyForm(submission)" color="primary">
            <v-icon>mdi-reply</v-icon>
            <span class="ml-2">{{ submission.replyCounter }}</span>
          </v-btn>

          <!-- Reply Form -->
          <v-textarea
            class="mt-3"
            v-show="submission.showReplyForm"
            v-model="submission.newReplyText"
            rows="1"
            row-height="15"
            label="Reply"
            variant="outlined"
          ></v-textarea>
          <v-btn
            v-show="submission.showReplyForm"
            @click="addReply(submission, index)"
            elevation="2"
            class="bg bg-primary"
            variant="outlined"
          >
            Reply
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
  
<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PostsPage',
    data() {
      return {
        inputText: '',
        title: 'Louie',
        submissions: [],
      };
    },
    methods: {
      handleSubmit() {
        // Get current date and time
        const now = new Date();
        const date = now.toDateString();
        const time = now.toLocaleTimeString();

        // Add a new submission to the array with its own counter
        this.submissions.unshift({
          title: this.title,
          dateTime: `${date} ${time}`,
          text: this.inputText,
          heartCounter: 0, // Initialize the counter for this submission
          showReplyForm: false, // Initialize the showReplyForm property
          newReplyText: '', // Initialize the newReplyText property
          replies: [], // Initialize the replies array
        });

        // Clear the inputText for the next submission
        this.inputText = '';
      },
      incrementCounter(index) {
        // Increment the heart counter for the specified submission
        this.submissions[index].heartCounter++;
      },
      toggleReplyForm(submission) {
        submission.showReplyForm = !submission.showReplyForm;
        submission.newReplyText = ''; // Clear the reply input
      },
      addReply(submission, index) {
        const newReplyText = submission.newReplyText;

        if (newReplyText) {
          submission.replies.push({
            name: 'Louie', // Set the reply user as Louie
            dateTime: new Date().toLocaleString(),
            text: newReplyText,
            heartCounter: 0,
          });

          submission.newReplyText = ''; // Clear the reply input

            // Increment the main post's reply counter
            submission.replyCounter = (submission.replyCounter || 0) + 1;
        }
      },
      incrementReplyHeart(postIndex, replyIndex) {
        this.submissions[postIndex].replies[replyIndex].heartCounter++;
      },
    },
  });
</script>
  
<style scoped>

/* Style for the reply cards */
.v-card.mb-2 {
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>