import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
  Image,
  Font,
  Line,
} from "@react-pdf/renderer";
import logo from "../assets/logo1.png";
import logo1 from "../assets/doh.png";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Oswald",
    padding: 40,
  },
  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftlogo: {
    marginRight: 70,
  },
  rightlogo: {
    marginLeft: 70,
  },
  image: {
    width: 70, // Adjust the width as needed
    height: 70,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 1,
  },
  author: {
    fontSize: 14,
    textAlign: "center",
  },
  columnsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "55%", // Adjust the width as needed
  },
  columnrow: {
    flexDirection: "row",
  },
  column3: {
    width: "33.33%", // Divide the page into three columns
    padding: 5,
  },
  subtext: {
    fontSize: 18,
    marginBottom: 10,
  },
  sub1text: {
    fontSize: 12,
  },
  nametext: {
    fontSize: 12,
    marginTop: 30,
    marginLeft: 100,
    textDecoration: "underline",
  },
  nursetext: {
    fontSize: 10,
    marginLeft: 122,
    marginBottom: 10,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  text2: {
    fontSize: 10,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    marginTop: 10,
  },
  line2: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'justify',
  },
  checkboxImage: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  footer: {
    fontSize: 8,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

const ViewPage = () => {
  const [pregnancy, setPregnancy] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pregnancyDocRef = doc(db, "pregnancy", id);

    const fetchData = async () => {
      try {
        const docSnapshot = await getDoc(pregnancyDocRef);

        if (docSnapshot.exists()) {
          setPregnancy({ ...docSnapshot.data(), id: docSnapshot.id });
        } else {
          setPregnancy({});
        }
      } catch (error) {
        console.error("Error fetching pregnancy data:", error);
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
            <View style={styles.top}>
              <View style={styles.leftlogo}>
                <Image style={styles.image} src={logo}></Image>
              </View>
              <Text style={styles.title}>INDIVIDUAL TREATMENT RECORD</Text>

              <View style={styles.rightlogo}>
                <Image style={styles.image} src={logo1}></Image>
              </View>
            </View>
            <Text style={styles.author}>Prenatal Care</Text>
            <View style={styles.columnsContainer}>
              {/* Left Column */}
              <View style={styles.column}>
                <Text style={styles.subtext}>PREGNANT INFORMATION</Text>
                <Text style={styles.text}>Name: {pregnancy.name}</Text>
                <Text style={styles.text}>Age: {pregnancy.age} y/o</Text>
                <Text style={styles.text}>
                  Date of Birth:{" "}
                  {new Date(pregnancy.dob.seconds * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </Text>
                <Text style={styles.text}>Address: {pregnancy.address}</Text>
                <Text style={styles.text}>
                  Husband/Relatives: {pregnancy.husband}
                </Text>
              </View>
              {/* Right Column */}
              <View style={styles.column}>
                <Text style={styles.subtext}> </Text>
                <Text style={styles.text}>
                  LMP:{" "}
                  {new Date(pregnancy.lmp.seconds * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </Text>
                <Text style={styles.text}>
                  EDC:{" "}
                  {new Date(pregnancy.edc.seconds * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </Text>
                <Text style={styles.text}>
                  PHILHEALTH: {pregnancy.philhealth}
                </Text>
                <Text style={styles.text}>
                  Contact No.: {pregnancy.contact}
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.sub1text}>
              DATE:{" "}
              {new Date(pregnancy.timeStamp.seconds * 1000).toLocaleDateString(
                "en-US"
              )}{" "}
            </Text>
            <View style={styles.line2}></View>
            <View style={styles.columnsContainer}>
              {/* Left Column */}
              <View style={styles.column}>
                <Text style={styles.subtext}>VITAL SIGN/ASSESSMENT</Text>
                <Text style={styles.text}>Temperature: {pregnancy.temp}°c</Text>
                <Text style={styles.text}>Pulse Rate: {pregnancy.pr}bpm</Text>
                <Text style={styles.text}>
                  Blood Pressure: {pregnancy.bp}mnHg
                </Text>
                <Text style={styles.text}>
                  Respiration Rate: {pregnancy.rr}cpm
                </Text>
                <Text style={styles.text}>Weight: {pregnancy.weight}kg</Text>
                <Text style={styles.text}>Height: {pregnancy.height}cm</Text>
                <Text style={styles.text}>
                  Boday Mass Index: {pregnancy.bmi}
                </Text>
              </View>
              {/* Right Column */}
              <View style={styles.column}>
                <Text style={styles.subtext}> </Text>
                <Text style={styles.text}>
                  Assessment of Gestitional Age: {pregnancy.aog}wks
                </Text>
                <Text style={styles.text}>Fundal Height: {pregnancy.fh}cm</Text>
                <Text style={styles.text}>
                  Fetal Heart Tone: {pregnancy.fht}bpm
                </Text>
                <Text style={styles.text}>
                  Posterior Reversible Encephalopathy Syndrome: {pregnancy.pres}
                </Text>
                <Text style={styles.text}>
                  Polycysthic Ovary Syndrome: {pregnancy.pros}
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.columnrow}>
              <View style={styles.column3}>
                <Text style={styles.sub1text}>Td: {pregnancy.td}</Text>
              </View>
              <View style={styles.column3}>
                <Text style={styles.sub1text}>Laboratory: {pregnancy.lab}</Text>
              </View>
              <View style={styles.column3}>
                <Text style={styles.sub1text}>
                  Chief Complaints: {pregnancy.chief}
                </Text>
              </View>
            </View>
            <View style={styles.line2}></View>

            <View style={styles.columnsContainer}>
              {/* Left Column */}
              <View style={styles.column}>
                <Text style={styles.subtext}>REMARKS</Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox1
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Instructed mother to continue taking FeSO4 + Folic Acid 1 tab
                  OD as prescribed.
                </Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox2
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Encouraged mother to eat plenty of green leafy vegetables and
                  fruits.
                </Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox3
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Instructed to avoid/reduce intake of salty and fatty foods.
                </Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox4
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Increase fluid intake. have a glass of milk daily.
                </Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox5
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Avoid caffeinated beverages such as coffee and soda.
                </Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox6
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Avoid extraneous activity.
                </Text>

                <Text style={styles.subtext}> </Text>
              </View>
              {/* Right Column */}
              <View style={styles.column}>
                <Text style={styles.subtext}> </Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox7
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Encouraged to have exercise daily as tolerated (walking for
                  example) and to have enough rest and sleep.
                </Text>

                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox8
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Provide mother health teachings on the importance of personal
                  hygine, family planning and safe delivery.
                </Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox9
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Educated mother on the different danger signs of pregnancy and
                  instruct to report it immediately when experienced.
                </Text>
                <Text style={styles.checkboxText}>
                  <Image
                    src={
                      pregnancy.checkbox10
                        ? "/assets/checked.png"
                        : "/assets/unchecked.png"
                    }
                    style={styles.checkboxImage}
                  />
                  Explain to the mother the importance of breastfeeding and
                  proper nutrition for both mother and child.
                </Text>

                <Text style={styles.nametext}>ANTHONY D. VALLES, RN</Text>
                <Text style={styles.nursetext}> Nurse/Midwife</Text>
              </View>
            </View>
            <Text style={styles.footer} fixed>
              ~ System generated document ~
            </Text>
          </Page>
        </Document>
      );

      pdf(PDF)
        .toBlob()
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url);
        });
    };

    // Only generate PDF when pregnancy data is available
    if (pregnancy.id) {
      generatePDF();
      navigate("/dashboard/pregnancy");
    }
  }, [pregnancy]);

  return null;
};

export default ViewPage;
