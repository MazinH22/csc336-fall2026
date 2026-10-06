const rooms = {
    dormRoom: {
        name: "Dorm Room",
        description: "You are in your dorm room getting ready to head out. Your gym clothes are packed and you are trying to remember everything you need.",
        linkedRooms: [
            { label: "Go to the Kitchen", destination: "kitchen" },
            { label: "Go to the Parking Lot", destination: "parkingLot" }
        ]
    },

    kitchen: {
        name: "Kitchen",
        description: "You are in the kitchen. You see a water bottle sitting on the counter.",
        linkedRooms: [
            { label: "Go back to the Dorm Room", destination: "dormRoom" }
        ],
        item: "Water Bottle"
    },

    parkingLot: {
        name: "Parking Lot",
        description: "You are standing in the parking lot near your car. Your car keys are on the ground next to the driver's door.",
        linkedRooms: [
            { label: "Go back to the Dorm Room", destination: "dormRoom" },
            { label: "Drive to the Gym", destination: "gym" }
        ],
        item: "Car Keys"
    },

    gym: {
        name: "Gym",
        description: "You made it to the gym. Time to lift and get a good workout in.",
        linkedRooms: [
            { label: "Go back to the Parking Lot", destination: "parkingLot" },
            { label: "Go to the Basketball Court", destination: "basketballCourt" }
        ]
    },

    basketballCourt: {
        name: "Basketball Court",
        description: "You walk over to the basketball court after your workout. A few people are playing, so you decide to shoot around for a little while.",
        linkedRooms: [
            { label: "Go back to the Gym", destination: "gym" }
        ]
    }
};

let currentRoom = "dormRoom";
let inventory = [];

const gameContainer = document.querySelector("#game-container");
const inventoryList = document.querySelector("#inventory-list");

function renderRoom(room) {
    gameContainer.innerHTML = "";

    const roomName = document.createElement("h2");
    roomName.innerHTML = room.name;
    gameContainer.append(roomName);

    const roomDescription = document.createElement("p");
    roomDescription.innerHTML = room.description;
    gameContainer.append(roomDescription);

    if (room.item) {
        let alreadyHasItem = false;

        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i] === room.item) {
                alreadyHasItem = true;
            }
        }

        if (alreadyHasItem === false) {
            const itemButton = document.createElement("button");
            itemButton.innerHTML = "Pick up " + room.item;
            itemButton.addEventListener("click", pickUpItem);
            gameContainer.append(itemButton);
        }
    }

    for (let i = 0; i < room.linkedRooms.length; i++) {
        const exitButton = document.createElement("button");

        exitButton.innerHTML = room.linkedRooms[i].label;
        exitButton.id = room.linkedRooms[i].destination;

        exitButton.addEventListener("click", changeRoom);

        gameContainer.append(exitButton);
    }
}

function changeRoom(e) {
    currentRoom = e.target.id;
    renderRoom(rooms[currentRoom]);
}

function pickUpItem() {
    const item = rooms[currentRoom].item;

    inventory.push(item);

    renderInventory();
    renderRoom(rooms[currentRoom]);
}

function renderInventory() {
    inventoryList.innerHTML = "";

    for (let i = 0; i < inventory.length; i++) {
        const item = document.createElement("li");
        item.innerHTML = inventory[i];
        inventoryList.append(item);
    }
}

renderRoom(rooms[currentRoom]);
renderInventory();