<script>
  export let id;
</script>

<form action="/actions/admin/publish" method="POST">
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
