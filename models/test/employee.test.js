const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if no arg', () => {
        const dep = new Employee({});

        dep.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;       
        });
    });

    it('should throw an error if arg is not a string', () => {

        const cases = [{}, []];
        
        for (let firstName of cases) {
            const dep = new Employee({ firstName });

            dep.validate(err => {
                expect(err.errors.firstName).to.exist;
            });
        }

        for (let lastName of cases) {
            const dep = new Employee({ lastName });

            dep.validate(err => {
                expect(err.errors.lastName).to.exist;
            });
        }

        
        for (let department of cases) {
            const dep = new Employee({ department });

            dep.validate(err => {
                expect(err.errors.department).to.exist;
            });
        }
    });

    it('should not throw an error if arg is okay', () => {

        const department = '5e5aedb36af09dc4837a5a16';
        const lastName = 'Wilson';
        const firstName = 'Jonhatan';
         
        
            const emp = new Employee({ firstName, lastName, department });

            emp.validate(err => {
                expect(err).to.not.exist;
            });
        
    });

    // after(() => {
    //     mongoose.models = {};
    // });

});