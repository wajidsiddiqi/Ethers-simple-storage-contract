// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleStorage {
    uint256 public favNumber;

    mapping(string => uint256) public nameToFavNumber;

    struct people {
        uint256 favNumber;
        string name;
    }

    people[] public persons;

    function store(uint256 _favNumber) public {
        favNumber = _favNumber;
    }

    function retrieve() public view returns (uint256) {
        return favNumber;
    }

    function addpersons(string memory _name, uint256 _favNumber) public {
        persons.push(people(_favNumber, _name));
        nameToFavNumber[_name] = _favNumber;
    }
}
