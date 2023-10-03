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
- Aisha

#### Automated tests:
- We tested this feature by creating a new user and a new post within the test file and setting that post to private using the typeOfPost attribute and checking if it is set to private, since the default value is public. This is sufficient to check if the feature works because the only way to check whether a post is processed as a private post is to check if the typeOfPost attribute is saved to the database.
- The test can be found in the file located at [https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/posts.js](https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/posts.js) from lines 169-175.

### Resolving Posts

#### How to use & user test:
- Aboud resolve

#### Automated tests:
- We tested this feature by creating a new topic within our test file and setting the topics' _isResolved_ attribute to true, since the default value is false. This test is crucial because it validates recent codebase modifications, including the introduction of the _isResolved_ attribute and its integration into both the backend and frontend, to ensure they function as intended. It also ensures that the controller functions and routes correctly handle the _isResolved_ attribute, which was subsequently saved in the database to reflect the resolved status of the topic.
- The test can be found in the file located at [https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/topics.js](https://github.com/CMU-17313Q/fall23-nodebb-just-relax/blob/main/test/posts.js) from lines 415-422.

