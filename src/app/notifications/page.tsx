"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import Navbar from "../../components/Navbar";

interface Notification {
	id: number;
	message: string;
	action: string;
}

const mockNotifications: Notification[] = [
	{
		id: 1,
		message: "Muhammad Saleh liked your project idea",
		action: "View Post",
	},
	{
		id: 2,
		message: "Mykhalio Chudyk left a comment on your project idea",
		action: "View Post",
	},
	{
		id: 3,
		message: "Nour Elafia liked your project idea",
		action: "View Post",
	},
];

const Notifications: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		setNotifications(mockNotifications);
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-[#F7F7F8] via-[#E3E7FF] to-[#DCE0FF] p-4">
			<Navbar />
			<div className="w-full max-w-lg rounded-xl border border-indigo-200 bg-white p-6 shadow-lg">
				{notifications.map((notification, index) => (
					<div key={notification.id}>
						<div className="flex items-center justify-between py-4">
							<div className="flex flex-grow items-center">
								<div className="mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
								<div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
									<User className="h-5 w-5 text-indigo-600" />
								</div>
								<p className="flex-grow text-gray-600">
									{notification.message}
								</p>
							</div>
							<button className="flex-shrink-0 rounded-full border border-black px-4 py-1 text-black">
								{notification.action}
							</button>
						</div>
						{index < notifications.length - 1 && (
							<div className="my-2 flex justify-center">
								<div className="w-10/12 border-t border-gray-200"></div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Notifications;
