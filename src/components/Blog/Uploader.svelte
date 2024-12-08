<script>
  import BlogFormInputs from "./BlogFormInputs.svelte";
  import Editor from "./Editor.svelte";
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
      <BlogFormInputs />
      <div>
        <Editor />
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="border group p-2 disabled:hover:bg-none hover:bg-purple-500 hover:border-black
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
      </div>
    </form>
    <div class="w-full flex justify-center pt-4"></div>
  </div>
</div>
