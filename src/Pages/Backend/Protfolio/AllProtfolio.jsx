import React from 'react';
import { NavLink, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const AllProtfolio = () => {
    const data =useLoaderData()
       const handleDelete = (id) => {
          console.log(id);
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            console.log(result.isConfirmed);
            if (result.isConfirmed) {
              // Start Deleting the coffee
              fetch(`https://server-site-azure.vercel.app/addprotfolio/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.deletedCount) {
                    Swal.fire(
                      "Deleted!",
                      "Protfolio Data Has been deleted.",
                      "success"
                    ).then(() => {
                      // Reload the page or update the UI as needed
                      window.location.reload();
                    });
                  }
                });
            }
          });
        };
    return (
        <>
                         <div className="overflow-x-auto p-6">
        <div className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full table-auto text-sm text-left text-gray-600">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">SL</th>
                <th className="px-6 py-4 font-semibold">Thumbnail</th>
                <th className="px-6 py-4 font-semibold">Title </th>
                <th className="px-6 py-4 font-semibold">Sub-Description </th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-green-100 transition-all duration-200`}
                >
                  <td className="px-6 py-3 font-medium">{index + 1}</td>
                  <td className="px-6 py-3">
                    <img src={item.thumbnail} className='w-30 h-20' alt="" srcset="" />
                    

                  </td>
                  <td className="px-6 py-3">{item.title}</td>
                  <td className="px-6 py-3">{item.subtitle}</td>

                  <td className="px-6 py-3 flex gap-3">
                    <NavLink to={`portfolio-view/${item._id}`} className='btn btn-warning'>View</NavLink>
                    <NavLink
                      to={`portfolio-edit/${item._id}`}
                      className="btn btn-success"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> 
            
        </>
    );
};

export default AllProtfolio;