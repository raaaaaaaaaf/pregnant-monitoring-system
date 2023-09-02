import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Page, Text, View, Document, StyleSheet, pdf, Image, Font } from '@react-pdf/renderer';
import logo from '../assets/logo1.png'

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Oswald',
        padding: 40,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 10,
      },
      author: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
      },
      columnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      column: {
        width: '55%', // Adjust the width as needed
      },
      subtext: {
        fontSize: 18,
        marginBottom: 10,
      },
      nametext: {
        fontSize: 12,
        marginTop: 35,
        marginLeft: 100,
        textDecoration: 'underline',
      },
      nursetext: {
        fontSize: 10,
        marginLeft: 110,
        marginBottom: 10,
      },
      text: {
        fontSize: 12,
        marginBottom: 10,
      },
      footer: {
        fontSize: 8,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
});

const ViewPage = () => {
  const [pregnancy, setPregnancy] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const pregnancyDocRef = doc(db, 'pregnancy', id);

    const fetchData = async () => {
      try {
        const docSnapshot = await getDoc(pregnancyDocRef);

        if (docSnapshot.exists()) {
          setPregnancy({ ...docSnapshot.data(), id: docSnapshot.id });
        } else {
          setPregnancy({});
        }
      } catch (error) {
        console.error('Error fetching pregnancy data:', error);
        setPregnancy({});
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Once pregnancy data is fetched, generate and display the PDF
    const generatePDF = () => {
      const PDF = (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>INDIVIDUAL TREATMENT RECORD</Text>
                <Text style={styles.author}>Prenatal Care</Text>
                <View style={styles.columnsContainer}>
                {/* Left Column */}
                <View style={styles.column}>
                    <Text style={styles.subtext}>PREGNANT INFORMATION</Text>
                    <Text style={styles.text}>Name: {pregnancy.name}</Text>
                    <Text style={styles.text}>Age: {pregnancy.age} y/o</Text>
                    <Text style={styles.text}>Date of Birth: {pregnancy.dob}</Text>
                    <Text style={styles.text}>Address: {pregnancy.address}</Text>
                    <Text style={styles.text}>Husband/Relatives: {pregnancy.husband}</Text>
                </View>
                {/* Right Column */}
                <View style={styles.column}>
                    <Text style={styles.subtext}> </Text>
                    <Text style={styles.text}>LMP: {pregnancy.lmp}</Text>
                    <Text style={styles.text}>EDC: {pregnancy.edc}</Text>
                    <Text style={styles.text}>PHILHEALTH: {pregnancy.philhealth}</Text>
                    <Text style={styles.text}>Contact No.: {pregnancy.contact}</Text>
                </View>
                </View>
                <Text style={styles.subtext}>DATE: {new Date(pregnancy.timeStamp.seconds * 1000).toLocaleDateString("en-US")} </Text>
                <View style={styles.columnsContainer}>
                {/* Left Column */}
                <View style={styles.column}>
                    <Text style={styles.subtext}>VITAL SIGN/ASSESSMENT</Text>
                    <Text style={styles.text}>Temperature: {pregnancy.temp}°c</Text>
                    <Text style={styles.text}>Pulse Rate: {pregnancy.pr}bpm</Text>
                    <Text style={styles.text}>Blood Pressure: {pregnancy.bp}mnHg</Text>
                    <Text style={styles.text}>Respiration Rate: {pregnancy.rr}cpm</Text>
                    <Text style={styles.text}>Weight: {pregnancy.weight}kg</Text>
                    <Text style={styles.text}>Height: {pregnancy.height}cm</Text>
                    <Text style={styles.text}>Boday Mass Index: {pregnancy.bmi}</Text>
                </View>
                {/* Right Column */}
                <View style={styles.column}>
                    <Text style={styles.subtext}> </Text>
                    <Text style={styles.subtext}> </Text>
                    <Text style={styles.text}>Assessment of Gestitional Age: {pregnancy.aog}wks</Text>
                    <Text style={styles.text}>Fundal Height: {pregnancy.fh}cm</Text>
                    <Text style={styles.text}>Fetal Heart Tone: {pregnancy.fht}bpm</Text>
                    <Text style={styles.text}>Posterior Reversible Encephalopathy Syndrome: {pregnancy.pres}</Text>
                    <Text style={styles.text}>Polycysthic Ovary Syndrome: {pregnancy.pros}</Text>
                </View>
                </View>
                <View style={styles.columnsContainer}>
                {/* Left Column */}
                <View style={styles.column}>
                    <Text style={styles.subtext}>REMARKS</Text>
                    <Text style={styles.text}>1 {pregnancy.remarks1}</Text>
                    <Text style={styles.text}>2 {pregnancy.remarks2}</Text>
                    <Text style={styles.text}>3 {pregnancy.remarks3}</Text>
                    <Text style={styles.text}>4 {pregnancy.remarks4}</Text>
                </View>
                {/* Right Column */}
                <View style={styles.column}>
                    <Text style={styles.subtext}> </Text>
                    <Text style={styles.subtext}> </Text>
                    <Text style={styles.subtext}> </Text>
                    <Text style={styles.nametext}>{pregnancy.nurse}</Text>
                    <Text style={styles.nursetext}>    Nurse/Midwife</Text>

                </View>
                </View>
                <Text style={styles.footer} fixed>~ System generated document ~</Text>
            </Page>
        </Document>
      );

      pdf(PDF).toBlob().then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url);
      });
    };

    // Only generate PDF when pregnancy data is available
    if (pregnancy.id) {
      generatePDF();
    }
  }, [pregnancy]);

  return null;
};

export default ViewPage;
