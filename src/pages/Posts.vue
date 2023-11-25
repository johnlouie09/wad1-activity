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

            <!-- Heart, Reply, Update and Delete Buttons for Main Post -->
            <v-row class="ma-4">
                <v-col class="text-right">
                    <!-- Heart Button -->
                    <v-btn @click="incrementCounter(index)" color="red">
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <span class="ml-2">{{ submission.heartCounter }}</span>

                    <!-- Reply Button -->
                    <v-btn class="ml-2" @click="addReply(submission, index)" color="primary">
                        <v-icon>mdi-reply</v-icon>
                    </v-btn>
                    <span class="ml-2">{{ submission.replyCounter }}</span>

                    <!-- Update Button -->
                    <v-btn class="ml-2" @click="editPost(index)" color="primary">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <!-- Delete Button -->
                    <v-btn class="ml-3" @click="deletePost(index)" color="error">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <!-- Display Replies as Cards at the Top -->
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
                            <!-- Heart Button -->
                            <v-btn @click="incrementReplyHeart(index, replyIndex)" color="red">
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            <span class="ml-2">{{ reply.heartCounter }}</span>

                            <!-- Update Button -->
                            <v-btn class="ml-2" @click="editReply(index, replyIndex)" color="primary">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>

                            <!-- Delete Button -->
                            <v-btn class="ml-3" @click="deleteReply(index, replyIndex)" color="error">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>

            <!-- Reply Form -->
            <v-row class="ma-4">
                <v-col class="text-right">
                    <v-textarea
                        class="mt-3"
                        v-model="submission.newReplyText"
                        rows="1"
                        row-height="15"
                        label="Reply"
                        variant="outlined"
                    ></v-textarea>
                    <v-btn
                        @click="addReply(submission)"
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

        /** DATA */
        data() {
            return {
                inputText: '',
                title: 'Louie',
                submissions: [],
            };
        },

        /** METHODS */
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
            addReply(submission) {
                const newReplyText = submission.newReplyText;

                if (newReplyText) {
                    submission.replies.push({
                        name: 'Louie', // Set the reply user as Louie
                        dateTime: new Date().toLocaleString(),
                        text: newReplyText,
                        heartCounter: 0
                    });

                    submission.newReplyText = ''; // Clear the reply input

                    // Increment the main post's reply counter
                    submission.replyCounter = (submission.replyCounter || 0) + 1;
                }
            },
            incrementReplyHeart(postIndex, replyIndex) {
                this.submissions[postIndex].replies[replyIndex].heartCounter++;
            },
            editPost(index) {
                // Implement logic to edit the main post
                const newText = prompt('Edit post:', this.submissions[index].text);
                if (newText !== null) {
                    this.submissions[index].text = newText;
                }
            },

            deletePost(index) {
                // Implement logic to delete the main post
                if (confirm('Are you sure you want to delete this post?')) {
                    this.submissions.splice(index, 1);
                }
            },

            editReply(postIndex, replyIndex) {
                // Implement logic to edit the reply
                const newReplyText = prompt('Edit reply:', this.submissions[postIndex].replies[replyIndex].text);
                if (newReplyText !== null) {
                    this.submissions[postIndex].replies[replyIndex].text = newReplyText;
                }
            },

            deleteReply(postIndex, replyIndex) {
                // Implement logic to delete the reply
                if (confirm('Are you sure you want to delete this reply?')) {
                    this.submissions[postIndex].replies.splice(replyIndex, 1);
                    // Decrease the reply counter for the main post
                    this.submissions[postIndex].replyCounter -= 1;
                }
            },
        }
    });
</script>
  
<style scoped>

</style>