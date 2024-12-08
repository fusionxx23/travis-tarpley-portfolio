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
