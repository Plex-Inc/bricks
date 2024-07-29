module.exports = {
    branches: [{ name: 'main', channel: 'latest' }],
    repositoryUrl: 'https://github.com/Plex-Inc/bricks.git',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        [
            '@semantic-release/npm',
            {
                npmPublish: true,
            },
        ],
        [
            '@semantic-release/github',
            {
                assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
                successComment: false,
            },
        ],
    ],
};
