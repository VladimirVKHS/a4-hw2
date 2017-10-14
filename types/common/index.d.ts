type GithubRepoOwner = {
    'login': string,
    'avatar_url': string,
    'html_url': string,
};

type GithubRepo = {
    'name': string,
    'full_name': string,
    'owner': GithubRepoOwner,
    'private': boolean,
    'html_url': string,
    'description': string,
    'stargazers_count': number,
    'watchers_count': number,
    'forks_count': number,
    'score': number
};
