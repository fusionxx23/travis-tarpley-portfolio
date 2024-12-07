<script lang="ts">
  import { type SelectBlog } from "@/libs/db/blog/table";
  import Editor from "./Editor.svelte";
  import { CLOUDFRONT_URL } from "@/data/constants";
  export let blog: SelectBlog;
  export let status = "";
  let isLoading = false;
  async function handleSubmit(event: Event) {
    isLoading = true;
  }

  const arr = blog.imageKey.split(".");
  const imageId = arr[0];
  let title = blog.title;
  let description = blog.description;
</script>

<div class=" flex justify-center">
  <div>
    <h1 class="text-xl">Editing: Blog {blog.title}</h1>
    <div class="w-[400px] h-[300px]">
      <img
        src={CLOUDFRONT_URL + "/" + `${imageId}_800x.webp`}
        alt="Thumbnail"
      />
    </div>
  </div>
</div>

<div class="">
  <div class="">
    <div>
      <form
        enctype="multipart/form-data"
        class="space-y-2"
        method="POST"
        on:submit={handleSubmit}
      >
        <div class="flex justify-center">
          <div class="space-y-6 max-w-[500px] mx-auto">
            <!-- Title Input -->
            <div>
              <label
                class="block text-sm font-medium text-gray-200"
                for="title"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                class="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                bind:value={title}
                required
              />
            </div>

            <!-- Description Input -->
            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-200"
              >
                Description
              </label>
              <input
                bind:value={description}
                type="text"
                name="description"
                id="description"
                class="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                required
              />
            </div>

            <!-- Thumbnail File Input -->
            <div>
              <label
                for="file"
                class="block text-sm font-medium text-gray-200"
              >
                Thumbnail
              </label>
              <input
                type="file"
                name="file"
                id="file"
                accept="image/png, image/jpeg"
                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                required
              />
            </div>
          </div>
          <Editor content={blog.blogContent} />
          <div class="flex justify-center pt-6">
            <div>
              <button
                type="submit"
                class="border group p-2 hover:bg-purple-500 disabled:hover:bg-none hover:border-black
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
        </div>
      </form>
    </div>
  </div>
</div>
