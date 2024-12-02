<script>
  export let id;
  let status = "";
  // Handle form submission
  async function handleSubmit(event) {
    const form = event.target;
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: "DELETE",
        body: formData,
      }).then((r) => r.json());
      console.log(response, "RESPONSE");
      if (response.success) {
        status = "Success!";
      } else {
        status = "Failed!";
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
</script>

<form action="/actions/admin/delete" method="POST">
  <input
    value={id.toString()}
    name="id"
    id="id"
    type="text"
    class="hidden"
  />
  <button
    type="submit"
    class="border border-red-400 hover:bg-red-400 p-2 hover:text-black
      text-red-400"
  >
    Delete
  </button>
</form>

<!-- on:submit|preventDefault={handleSubmit} -->
