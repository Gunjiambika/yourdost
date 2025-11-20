import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("first_name");
  const [filterDomain, setFilterDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchUsers = async (pageNum = 1) => {
    setLoading(true);
    const res = await fetch(`https://reqres.in/api/users?page=${pageNum}`);
    const data = await res.json();
    setUsers(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const filtered = users
    .filter((u) =>
      (u.first_name + " " + u.last_name + u.email)
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((u) =>
      filterDomain ? u.email.endsWith(filterDomain) : true
    )
    .sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-4 text-center">
        User Directory Table
      </h1>

      {/* Search */}
      <input
        className="border p-2 mb-4 w-full rounded"
        placeholder="Search by name or email..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sort */}
      <select
        className="border p-2 mb-4 mr-4 rounded"
        onChange={(e) => setSortKey(e.target.value)}
      >
        <option value="first_name">Sort by First Name</option>
        <option value="email">Sort by Email</option>
      </select>

      {/* Filter by email domain */}
      <select
        className="border p-2 mb-4 rounded"
        onChange={(e) => setFilterDomain(e.target.value)}
      >
        <option value="">Filter by Email Domain</option>
        <option value="example.com">@example.com</option>
        <option value="reqres.in">@reqres.in</option>
      </select>

      {/* Loading */}
      {loading ? (
        <div className="text-center mt-6">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Avatar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td className="border p-2">{u.id}</td>
                  <td className="border p-2">
                    {u.first_name} {u.last_name}
                  </td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">
                    <img
                      src={u.avatar}
                      alt=""
                      className="h-10 w-10 rounded-full mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage(1)}
          className="border px-4 py-2 rounded"
        >
          Page 1
        </button>

        <button
          onClick={() => setPage(2)}
          className="border px-4 py-2 rounded"
        >
          Page 2
        </button>
      </div>
    </div>
  );
}

export default App;
