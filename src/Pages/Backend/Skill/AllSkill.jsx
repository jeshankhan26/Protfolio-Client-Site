import React from 'react';
import { NavLink, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const AllSkill = () => {
  const data = useLoaderData();
  console.log(data);
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
        fetch(`https://server-site-azure.vercel.app/addskill/${id}`, {
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
                "Skill Data Has been deleted.",
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
    <div className="overflow-x-auto p-6">
      <div className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto text-sm text-left text-gray-600">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">SL</th>
              <th className="px-6 py-4 font-semibold">Skill Name</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
{[...data]?.reverse().map((item, index) => (
  <tr
    key={item.id || index}
    className={`${
      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
    } hover:bg-green-100 transition-all duration-200`}
  >
    <td className="px-6 py-3 font-medium">{data.length - index}</td>
    <td className="px-6 py-3">{item.name}</td>
    <td className="px-6 py-3 flex gap-3">
      {/* <button className='btn btn-warning'>View</button> */}
      <NavLink to={`skill-edit/${item._id}`} className='btn btn-success'>Edit</NavLink>
      <button onClick={() => handleDelete(item._id)} className='btn btn-error'>Delete</button>
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSkill;
