# Thomas Monfre CS52 Lab 4 :clipboard:

## What I Did
For this assignment, I built a live blog that is hosted at [tmonfre-blog.surge.sh](https://tmonfre-blog.surge.sh). Users can create blog posts, edit them, and delete them. Persistent storage and upate of posts is handled through the provided API. The blog posts have markdown support for text/visual content.

## What Worked / Didn't Work
I started by setting the routes necessary for the app. I then focused on allowing a user to create a post as a React component and view it. Since the `PostPreview` component isn't connected, I could do this all with basic React. Once a user could create a post in local state, I setup the redux infrastructure and added an action for creating a post. Once I had this working, I then built redux actions for fetching all posts from the database. With this in place, I then added several posts to the database. I then added functionality in redux for fetching a specific post. This gave me the base architecture of the app.

Once I had this, I then built out the rest of the app feature-by-feature. I focused first on updating post content. I created actions for this then ensured that the navigation properly moved after a user saved changes. I then focused on deleting a post.

I had some problems with handling navigation by pushing to history. I didn't initially realize that I could do that in my actions after the axios promise resolved. I also had some problems initially with the list view not updating unless I refreshed the page. This turned out to be a problem with `mapStateToProps`, which I was able to fix.

## Extra Credit

### Handling Axios Errors
I added an action `API_ERROR` for handling errors from `axios`. This basically will display the error message to the user when viewing a post if there is a failure. See below for an example:

![screenshot](error-handling.png)

### Input Validation
A user can't create a post unless all the fields are filled in. A warning appears if this happens. See below for an example:

![screenshot](input-validation.png)