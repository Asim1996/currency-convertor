const users=[{
	id:1,
	name:'Edge',
	schoolId:101
},{
	id:2,
	name:'Christian',
	schoolId:999
}];
const grades=[{
	id:1,
	schoolId:101,
	grade:85
},{
	id:2,
	schoolId:999,
	grade:95
},{
	id:3,
	schoolId:101,
	grade:100
}];
const getUser=(id)=>{
	return new Promise((resolve,reject)=>{
		const user=users.find((user)=>user.id===id);
		if(user){
			resolve(user);
		}else{
			reject(`Unable to find user with id of ${id}`);
		}
	})
}
const getGrades=(schoolId)=>{
	return new Promise((resolve,reject)=>{
		resolve(grades.filter((grade)=>grade.schoolId===schoolId));
	})
}
const getStatus=(userId)=>{
	// let user;
	return getUser(userId).then((tempuser)=>{
		// user=tempuser;
		// console.log(user);
		return getGrades(user.schoolId);
	}).then((grades)=>{
		let average=0;
		if(grades.length>0){
			average=grades.map((grade)=>grade.grade).reduce((a,b)=>a+b)/grades.length;
		}
		return `${tempuser.name} has a ${average}% in the class`
	});
}
const getStatusAlt=async (userId)=>{
	const user= await getUser(userId);
	const grades=await getGrades(user.schoolId);
	let average=0;
	if(grades.length>0){
			average=grades.map((grade)=>grade.grade).reduce((a,b)=>a+b)/grades.length;
		}
		return `${user.name} has a ${average}% in the class`
	console.log(user,grades);
	// throw new Error('This is an error');
	// return 'Mike'
}
getStatusAlt(1).then((status)=>{
	console.log(status);
}).catch((e)=>{
	console.log(e);
})
getStatus(1).then((status)=>{
	console.log(status)
}).catch((e)=>{
	console.log(e);
})
// getUser(1).then((user)=>{
// 	console.log(user)
// }).catch((e)=>{
// 	console.log(e);
// })