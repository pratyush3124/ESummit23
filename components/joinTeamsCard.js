"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";

// import Avatar, { genConfig } from 'react-nice-avatar'

function JoinTeamsCard({ teamData, session, eventName }) {
  // const config = genConfig(AvatarConfig)

  function handleJoinReq(teamId) {
    console.log("teamID!!!!!!!", teamId);

    eventName = eventName.toLowerCase();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/${eventName}/requests/${teamId}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success("Join Request Sent Successfully");
          console.log("Join Request Sent Successfully");
        }
      });
  }

  let teamLeader;

  teamData?.members.map((x) => {
    if (x[eventName + "TeamRole"] == 0) {
      teamLeader = x;
    }
  });

  return (
    <div className={styles.Cards}>
      <div className={styles.infogroup}>
        <div>
          <h3 className={styles.Cardsh3}>TeamName: {teamData?.teamName}</h3>
          <h3 className={styles.Cardsh3}>
            Team Leader Email: {teamLeader?.email}
          </h3>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => handleJoinReq(teamData?._id)}
          >
            Join Team
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
    // <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   <div className="flex flex-col items-center pb-10">
    //     <div className="w-24 h-24 mb-3 rounded-full shadow-lg">
    //       {/* <Avatar className="w-32 h-32" {...config} /> */}
    //     </div>
    //     <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
    //       Team Name: {teamData?.teamName}
    //     </h5>
    //     <span className="text-sm text-gray-500 dark:text-gray-400">
    //       Leader email: {teamLeader?.email}
    //     </span>
    //     <div className="flex mt-4 space-x-3 md:mt-6">
    //       <button
    //         onClick={(e) => handleJoinReq(teamData?._id)}
    //         className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Join Team
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // <h1>hi</h1>
  );
}

export default JoinTeamsCard;