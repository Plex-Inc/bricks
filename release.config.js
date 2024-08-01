/* eslint-disable no-template-curly-in-string */
module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        '@semantic-release/npm',
        [
            '@semantic-release/github',
            {
                successComment: false,
                failComment: false,
                failTitle: false,
                releasedLabels: 'release',
                addReleases: 'bottom',
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['package.json', 'CHANGELOG.md'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
        [
            'semantic-release-github-pr',
            {
                autoMerge: false,
                prTitle: 'chore: release ${nextRelease.version}',
                prBody: 'This PR prepares the release ${nextRelease.version}\n\n${nextRelease.notes}',
                branchName: 'release/${nextRelease.version}',
            },
        ],
    ],
};
