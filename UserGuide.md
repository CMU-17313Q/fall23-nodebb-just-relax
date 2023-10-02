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
- Aboud

#### Automated tests:
- Maria - You should also provide a link/description of where your added automated tests can be found, along with a description of what is being tested and why you believe the tests are sufficient for covering the changes that you have made
