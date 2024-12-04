<script>
  export let status;

  let isLoading = false;
  // Handle form submission
  async function handleSubmit() {
    isLoading = true;
  }
</script>

<div class="w-[500px] mx-auto py-6">
  <a class="border p-2" href="/admin">Back</a>
</div>
<div class="flex justify-center">
  <div>
    <form
      method="post"
      enctype="multipart/form-data"
      class="space-y-2"
      on:submit={handleSubmit}
    >
      <div>
        <div>
          <label for={`title`}>Title</label>
        </div>
        <input
          type="text"
          class="text-black p-2"
          name="title"
          id="title"
          required
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
          required
        ></textarea>
      </div>

      <div>
        <label for="file">Thumbnail</label>
        <input
          class="text-black"
          type="file"
          name="file"
          id="file"
          required
          accept="image/png, image/jpeg"
        />
      </div>

      <button
        type="submit"
        class="border group p-2 hover:bg-purple-500 hover:border-black
          hover:text-black"
        disabled={isLoading}
      >
        <div class="group-disabled:hidden">
          Upload Blog Post
        </div>
        <div class="group-disabled:block hidden">
          Loading...
        </div>
      </button>
      <p>{status}</p>
    </form>
    <div class="w-full flex justify-center pt-4"></div>
  </div>
</div>
