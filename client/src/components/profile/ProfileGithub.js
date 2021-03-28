import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProfileGithub({ username }) {
	//component initial state
	let [state, setState] = useState({
		clientId: 'cc4b17f2d2b5d8dae051',
		clientSecret: '65814960391b685c174f509ecd9f9bf4c31d88dd',
		count: 5,
		sort: 'created: asc',
		repos: [],
	});

	useEffect(() => {
		let mounted = true;
		const { count, sort, clientId, clientSecret } = state;

		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (mounted) {
					setState({
						...state,
						repos: data,
					});
				}
			})
			.catch((err) => console.log(err));

		return () => (mounted = false);
	}, []);

	const { repos } = state;

	const repoItems = repos.map((repo) => (
		<div key={repo.id} className="card card-body mb-2">
			<div className="row">
				<div className="col-md-6">
					<h4>
						<a href={repo.html_url} className="text-info" target="_blank">
							{repo.name}
						</a>
					</h4>
					<p>{repo.description}</p>
				</div>
				<div className="col-md-6">
					<span className="badge badge-info mr-1">
						Stars: {repo.stargazers_count}
					</span>
					<span className="badge badge-secondary mr-1">
						Watchers: {repo.watchers_count}
					</span>
					<span className="badge badge-success">Forks: {repo.forks_count}</span>
				</div>
			</div>
		</div>
	));

	return (
		<div>
			<hr />
			<h3 className="mb-4">Latest Github Repos</h3>
			{repoItems}
		</div>
	);
}

export default ProfileGithub;
