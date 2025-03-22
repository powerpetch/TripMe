export const createPost = async (postData) => {
  console.log("Post Data being sent:", postData);
  try {
    const response = await fetch("http://localhost:5001/api/posts", {
      method: "POST",
      body: postData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: connot create post", error);
    return { success: false, message: "Error on fetching data to the API" };
  }
};

export const fetchAllPosts = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.message}`);
    }
    const data = await response.json();
    // console.log(`this is data: ${response.data.}`)
    return data;
  } catch (error) {
    console.log("Error on fetching data", error);
    return { success: false, message: "Error on fetching posts" };
  }
};

export const fetchMyPost = async () => {
  try {
    const response = await fetch(`http://localhost:5001/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: error.message };
  }
};

export const deletePost = async (postID) => {
  try {
    const response = await fetch(`http://localhost:5001/api/posts/${postID}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};

export const getCountries = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/ai");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};

export const getPlan = async (promptData) => {
  const location = promptData.country;
  const duration = promptData.duration;
  console.log(location, duration);
  try {
    const response = await fetch(
      `http://localhost:5001/api/posts/ai/${location}/${duration}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};

export const addComment = async (commentData, postID) => {
  console.log(commentData);
  try {
    const response = await fetch(
      `http://localhost:5001/api/posts/comment/${postID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, message: "error posting comment" };
  }
};

export const getComments = async (postID) => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/posts/comment/${postID}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getUser = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/profile", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.message}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
};

export const likePost = async (pid) => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/posts/like/${pid}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error posting like" };
  }
};

export const getLike = async (pid) => {
  console.log(pid)
  try {
    const response = await fetch(
      `http://localhost:5001/api/posts/like/${pid}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error getting likes" };
  }
};
