export const createPost = async (postData) => {
  console.log("Post Data being sent:", postData);
  try {
    const response = await fetch("http://localhost:5002/api/posts", {
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
    const response = await fetch("http://localhost:5002/api/posts", {
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
    const response = await fetch(`http://localhost:5002/api/posts/byname`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    const response = await fetch(`http://localhost:5002/api/posts/${postID}`, {
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
    const response = await fetch("http://localhost:5002/api/ai");
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
      `http://localhost:5002/api/posts/ai/${location}/${duration}`
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
      `http://localhost:5002/api/posts/comment/${postID}`,
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
      `http://localhost:5002/api/posts/comment/${postID}`
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
    const response = await fetch("http://localhost:5002/api/profile", {
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
      `http://localhost:5002/api/posts/like/${pid}`,
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
  try {
    const response = await fetch(
      `http://localhost:5002/api/posts/like/${pid}`,
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

export const getTopPost = async () => {
  try {
    const response = await fetch("http://localhost:5002/api/posts/pop");
    if (!response.ok) {
      throw new Error("error fetching top posts");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const findUserByName = async (username) => {
  try {
    const response = await fetch(`http://localhost:5002/api/user/${username}`);
    if (!response.ok) {
      throw new Error("error fetching user");
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const findPostsByName = async (username) => {
  try {
    const response = await fetch(
      `http://localhost:5002/api/posts/find/${username}`
    );
    if (!response.ok) {
      throw new Error("error fetching post by name");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
};
