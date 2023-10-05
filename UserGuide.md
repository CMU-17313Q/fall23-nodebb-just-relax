# User Documentation

This file provides a detailed outline of how to use and user test the new feature(s) in our version of NodeBB along with details of the automated tests used for these features.

## Features

### Anonymous Posts

#### How to use & user test:
- Rama

#### Automated tests:
- We tested this feature by creating a new user and a new post within the test file and setting that post to anonymous using the isAnonymous attribute and checking if it is set to anonymous, since the default value is None. This is sufficient to check if the feature works because the only way to check whether a post is processed as an anonymous post is to check if the isAnonymous attribute is saved to the database.
- The test can be found in the file located at [https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/posts.js](https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/posts.js) from lines 163-168.

### Private Posts

#### How to use & user test:
- The private post feature in NodeBB allows users to create posts that are only visible to themselves and instructors. This ensures that certain information can be shared in a controlled environment without being exposed to other students or general users. To create a private post, navigate to the ‘Q&A’ section, click on ‘New Topic’, and you can fill out the form. Next to the submit button, there’s an option to make the post private. To test that, when clicking on that and submitting, that post should come up in the post menu list just like other public questions. If you logout and login as another user, that post should not be listed in the posts list. However, if you login as an instructor, the student’s private post should be visible.

#### Automated tests:
- We tested this feature by creating a new user and a new post within the test file and setting that post to private using the typeOfPost attribute and checking if it is set to private, since the default value is public. This is sufficient to check if the feature works because the only way to check whether a post is processed as a private post is to check if the typeOfPost attribute is saved to the database.
- The test can be found in the file located at [https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/posts.js](https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/posts.js) from lines 169-175.

### Resolving Posts

#### How to use & user test:
- The post-resolution feature of NodeBB allows instructors to mark a reply in a topic as "Resolved." This flag is useful to show readers of the topic that the question asked has an answer that successfully addressed the original inquiry. To mark a post as resolved, navigate to any topic under the 'Q&A' section, and find the reply that contains the appropriate solution to the question. In the bottom right corner of the reply, click the button "Resolve." To protect against accidental clicks, a window will pop up asking to confirm your action. Click "Yes, resolve" to continue. The original "Resolve" button will now appear as a red stamp indicting to users that this reply resolves the question.

#### Automated tests:
- We tested this feature by creating a new topic within our test file and setting the topics' _isResolved_ attribute to true, since the default value is false. This test is crucial because it validates recent codebase modifications, including the introduction of the _isResolved_ attribute and its integration into both the backend and frontend, to ensure they function as intended. It also ensures that the controller functions and routes correctly handle the _isResolved_ attribute, which was subsequently saved in the database to reflect the resolved status of the topic.
- The test can be found in the file located at [https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/topics.js](https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/posts.js) from lines 415-422.

