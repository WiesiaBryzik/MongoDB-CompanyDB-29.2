const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {

        try {
            const fakeDB = new MongoMemoryServer();

            const uri = await fakeDB.getConnectionString();

            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        } catch (err) {
            console.log(err);
        };
    });

    describe('Reading data', () => {

        before(async () => {

           
            const testEmpOne = new Employee({ firstName: 'John #1', lastName: 'surname #1', department: '1' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'John #2', lastName: 'surname #2', department: '2' });
            await testEmpTwo.save();
            
        })

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return proper document by various params with "findOne" method', async () => {
            const employees = await Employee.findOne({ firstName: 'name #1' });
            const expectedName = 'name #1';
            expect(employees.firstName).to.be.equal(expectedName);
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'name #1', lastName: 'surname #1', department: 'Department #1' });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Updating data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'name #1', lastName: 'surname', department: '5e5aedb36af09dc4837a5a16' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'name #2', lastName: 'surname #2', department: 'Department #2' });
            await testEmpTwo.save();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'name #1' }, { $set: { firstName: '=name #1=' } });
            const updatedEmployee = await Employee.findOne({ firstName: '=name #1=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'name #1' });
            employee.firstName = '=name #1=';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ firstName: '=name #1=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
            const employees = await Employee.find();
            expect(employees[0].firstName).to.be.equal('Updated!');
            expect(employees[1].firstName).to.be.equal('Updated!');
        });

        // different option
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
            const employees = await Employee.find({ firstName: 'Updated!' });
            expect(employees.length).to.be.equal(2);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Removing data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'name #1', lastName: 'surname', department: '5e5aedb36af09dc4837a5a16' });
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'name #2', lastName: 'surname #2', department: 'Department #2' });
            await testEmpTwo.save();
        });

            it('should properly remove one document with "deleteOne" method', async () => {
                await Employee.deleteOne({ firstName: 'name #1' });
                const removeEmployee = await Employee.findOne({ firstName: 'name #1' });
                expect(removeEmployee).to.be.null;
            });

            it('should properly remove one document with "remove" method', async () => {
                const employee = await Employee.findOne({ firstName: 'name #1' });
                await employee.remove();
                const removedEmployee = await Employee.findOne({ firstName: 'name #1' });
                expect(removedEmployee).to.be.null;
            });

            it('should properly remove multiple documents with "deleteMany" method', async () => {
                await Employee.deleteMany();
                const employees = await Employee.find();
                expect(employees.length).to.be.equal(0);
            });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });
});