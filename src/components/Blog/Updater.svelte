<script lang="ts">
  import { type SelectBlog } from "@libs/models/index";
  import { CLOUDFRONT_URL } from "@data/constants";
  export let blog: SelectBlog;
  let status: string = "";

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log("PUT");
    try {
      const response = await fetch(form.action, {
        method: "PUT",
        body: formData,
      }).then((r) => r.json());
      if (response.success) {
        status = "Success!";
      } else {
        status = "Failed!";
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  const arr = blog.imageKey.split(".");
  const imageId = arr[0];
  const ext = arr[1];
</script>

<div class="flex justify-center">
  <div>
    <h1>Editing Blog {blog.title}</h1>
    <div class="w-[400px] h-[300px]">
      <img
        src={CLOUDFRONT_URL +
          "/" +
          `${imageId}_800x.${ext}`}
        alt="Thumbnail"
      />
    </div>
    <div>
      <form
        action="/actions/blog"
        enctype="multipart/form-data"
        class="space-y-2"
        on:submit|preventDefault={handleSubmit}
      >
        <input
          type="text"
          hidden
          name="id"
          value={blog.id}
        />
        <div>
          <div>
            <label for="title">Title</label>
          </div>
          <input
            type="text"
            class="text-black p-2"
            name="title"
            id="title"
            required
            value={blog.title}
          />
        </div>
        <div>
          <div>
            <label for="description">Description</label>
          </div>
          <input
            type="text"
            class="text-black p-2"
            name="description"
            id="description"
            required
            value={blog.description}
          />
        </div>
        <div>
          <div>
            <label for="blog">Blog Post</label>
          </div>
          <textarea
            class="text-black p-2 h-[200px] w-[400px]"
            name="blog"
            id="blog"
            required>{blog.blogContent}</textarea
          >
        </div>
        <div class="text-white">
          <label for="file">Thumbnail</label>
          <input
            class="text-white"
            type="file"
            name="file"
            id="file"
            accept="image/png, image/jpeg"
          />
        </div>
        <button
          type="submit"
          class="border p-2 hover:bg-purple-500 hover:border-black
          hover:text-black"
        >
          Upload Blog Post
        </button>
        <p>{status}</p>
      </form>
    </div>
  </div>
</div>
