"use strict";
// This is one of the two example TypeScript files included with the NodeBB repository
// It is meant to serve as an example to assist you with your HW1 translation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setActivePostSharingNetworks = exports.getActivePostSharing = exports.getPostSharing = void 0;
const lodash_1 = __importDefault(require("lodash"));
const plugins_1 = __importDefault(require("./plugins"));
const database_1 = __importDefault(require("./database"));
let postSharing;
async function getPostSharing() {
    if (postSharing) {
        return lodash_1.default.cloneDeep(postSharing);
    }
    let networks = [
        {
            id: 'facebook',
            name: 'Facebook',
            class: 'fa-facebook',
            activated: undefined, // Initialize as undefined
        },
        {
            id: 'twitter',
            name: 'Twitter',
            class: 'fa-twitter',
            activated: undefined, // Initialize as undefined
        },
    ];
    networks = await plugins_1.default.hooks.fire('filter:social.posts', networks);
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const activated = await database_1.default.getSetMembers('social:posts.activated');
    for (const network of networks) {
        network.activated = activated.includes(network.id);
    }
    postSharing = networks;
    return lodash_1.default.cloneDeep(networks);
}
exports.getPostSharing = getPostSharing;
async function getActivePostSharing() {
    const networks = await getPostSharing();
    return networks.filter(network => network && network.activated);
}
exports.getActivePostSharing = getActivePostSharing;
async function setActivePostSharingNetworks(networkIDs) {
    postSharing = undefined; // Initialize as undefined
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await database_1.default.delete('social:posts.activated');
    if (networkIDs.length === 0) {
        return;
    }
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await database_1.default.setAdd('social:posts.activated', networkIDs);
}
exports.setActivePostSharingNetworks = setActivePostSharingNetworks;
