<script lang="ts">
  import { type SelectBlog } from "@/libs/models/index";
  import Editor from "./Editor.svelte";
  import { CLOUDFRONT_URL } from "@/data/constants";
  export let blog: SelectBlog;
  let status: string = "";
  let isLoading = false;
  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    isLoading = true;
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
    isLoading = false;
  }

  const arr = blog.imageKey.split(".");
  const imageId = arr[0];
  const ext = arr[1];
</script>

<div class=" flex justify-center">
  <div>
    <h1 class="text-xl">Editing: Blog {blog.title}</h1>
    <div class="w-[400px] h-[300px]">
      <img
        src={CLOUDFRONT_URL +
          "/" +
          `${imageId}_800x.${ext}`}
        alt="Thumbnail"
      />
    </div>
  </div>
</div>

<div class="">
  <div class="">
    <div>
      <form
        action="/actions/admin/blog"
        enctype="multipart/form-data"
        class="space-y-2"
        on:submit|preventDefault={handleSubmit}
      >
        <div class="flex justify-center">
          <div class="space-y-4">
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
          </div>
        </div>

        <Editor content={blog.blogContent} />
        <div class="flex justify-center pt-6">
          <div>
            <button
              type="submit"
              class="border group p-2 hover:bg-purple-500 hover:border-black
          hover:text-black"
              disabled={isLoading}
            >
              <div class="group-disabled:hidden">
                Update Blog Post
              </div>
              <div class="group-disabled:block hidden">
                Loading...
              </div>
            </button>
            <p>{status}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
