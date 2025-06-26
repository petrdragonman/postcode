import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllPostcodes,
  getPostcodeByCode,
  getPostcodeBySuburb,
  createPostcode,
  updatePostcode,
  deletePostcode,
  type Postcode,
  type StateCode,
} from "../services/PostcodesService";
import type { SearchFormData } from "../components/searchForm/schema";
import PostcodeList from "../components/PostcodeList";
import SearchForm from "../components/searchForm/SearchForm";
import LoadingPlacedolder from "../components/loading placeholder/LoadingPlacedolder";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { getToken } from "../services/AuthService";

const stateOptions: StateCode[] = [
  "NSW",
  "VIC",
  "QLD",
  "SA",
  "WA",
  "TAS",
  "NT",
  "ACT",
];

const PostcodesPage = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPostcode, setCurrentPostcode] = useState<Postcode | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAuthenticated, logout, login } = useAuth();

  const { data, isPending, error } = useQuery({
    queryKey: ["postcodes", searchQuery],
    queryFn: () => {
      if (!isAuthenticated) throw new Error("Unauthorized");
      if (searchQuery === null) return getPostcodeByCode("2039");
      if (searchQuery !== null) {
        return /^\d+$/.test(searchQuery)
          ? getPostcodeByCode(searchQuery)
          : getPostcodeBySuburb(searchQuery);
      }
    },
    enabled: isAuthenticated,
    retry: false,
  });

  const saveMutation = useMutation({
    mutationFn: (postcode: Postcode) => {
      if (!isAuthenticated) throw new Error("Unauthorized - Please login");
      const token = getToken();
      if (!token) throw new Error("Missing authentication token");

      return postcode.id
        ? updatePostcode(postcode.id, postcode)
        : createPostcode(postcode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postcodes"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      if (
        error.message.includes("Unauthorized") ||
        error.message.includes("Missing")
      ) {
        logout();
        navigate("/login");
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePostcode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postcodes"] });
      setIsDeleteConfirmOpen(false);
    },
  });

  // Handler functions
  const handleSearchSubmit = (query: SearchFormData) => {
    setSearchQuery(query.query.trim() || null);
  };

  const handleCreate = () => {
    setCurrentPostcode({
      id: 0,
      postcode: "",
      suburb: "",
      stateCode: "NSW",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (postcode: Postcode) => {
    setCurrentPostcode(postcode);
    setIsModalOpen(true);
  };

  const handleDeleteInitiate = (id: number) => {
    setCurrentPostcode({ id, postcode: "", suburb: "", stateCode: "NSW" });
    setIsDeleteConfirmOpen(true);
  };

  const handleSave = () => {
    if (currentPostcode?.postcode && currentPostcode?.suburb) {
      saveMutation.mutate(currentPostcode);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentPostcode?.id) {
      deleteMutation.mutate(currentPostcode.id);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentPostcode((prev) => ({ ...prev, [name]: value } as Postcode));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading postcodes: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header className="flex justify-between items-center text-orange-500 mb-10">
        <h1>POSTCODES</h1>
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </header>

      <section className=" flex justify-start pl-1.5 italic text-xl">
        Search by typing Postcode or Suburb.
      </section>
      <div className="flex gap-4 pb-4 m-2">
        <SearchForm onSubmit={handleSearchSubmit} />
        {isAuthenticated ? (
          <section>
            <button
              className=" text-red-400 w-50 text-[16px] px-4 py-2 rounded shadow-md"
              onClick={handleCreate}
            >
              Create postcode
            </button>
            <p></p>
          </section>
        ) : (
          <section className="w-50"></section>
        )}
      </div>

      <div className="bg-white p-2 rounded-lg shadow-sm border border-orange-100">
        {isPending ? (
          <LoadingPlacedolder />
        ) : data?.data == null ? (
          <div className="text-center py-8 text-xl text-red-500">
            {data?.message || "No postcodes found"}
          </div>
        ) : (
          <PostcodeList
            postcodes={data.data}
            onEdit={handleEdit}
            onDelete={handleDeleteInitiate}
          />
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && currentPostcode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {currentPostcode.id !== 0
                  ? "Edit Postcode"
                  : "Create New Postcode"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Postcode
                  </label>
                  <input
                    name="postcode"
                    value={currentPostcode.postcode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g. 2000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Suburb
                  </label>
                  <input
                    name="suburb"
                    value={currentPostcode.suburb}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g. Sydney"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    State
                  </label>
                  <select
                    name="stateCode"
                    value={currentPostcode.stateCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-200"
                  >
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={
                    saveMutation.isPending ||
                    !currentPostcode.postcode ||
                    !currentPostcode.suburb
                  }
                  className="px-4 py-2 bg-orange-600 text-orange-600 rounded hover:bg-orange-700 disabled:bg-orange-300"
                >
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>

              {saveMutation.isError && (
                <div className="mt-3 text-red-500 text-sm">
                  {saveMutation.error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && currentPostcode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete postcode {currentPostcode.id}?
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleteMutation.isPending}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300"
                >
                  {deleteMutation.isPending
                    ? "Deleting..."
                    : "Delete Permanently"}
                </button>
              </div>

              {deleteMutation.isError && (
                <div className="mt-3 text-red-500 text-sm">
                  {deleteMutation.error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostcodesPage;

/////////////////////////////////
