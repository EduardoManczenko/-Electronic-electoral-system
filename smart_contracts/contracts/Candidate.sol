// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;


import "./CandidateStructs.sol";

contract Candidate is CandidateStructs{
    candidateData data;
    address urna;

    constructor(candidateData memory data_, address urna_){
        data = data_;
        urna = urna_;
    }

    modifier onlyUrna(){
        require(msg.sender == urna, "!urna");
        _;
    }

    function vote() public onlyUrna(){
        data.votes++;
    }

    function returnCandidateData()public view returns(candidateData memory){
        return data;
    }

    function returnCandidateUrna()public view returns(address){
        return urna;
    }
}